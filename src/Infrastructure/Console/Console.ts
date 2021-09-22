import {
  HelperDate,
  HelperText,
  Logger,
  LogLevel,
  Message
} from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from './Message/ReceivedConsoleCommand';
import { MemoryHandler } from '../Core/MemoryHandler';
import { SendDebugToConsole } from './Message/SendDebugToConsole';
import { ScheduleMessage } from '../Schedule/Message/ScheduleMessage';
import { ShowDebugToConsole } from './Message/ShowDebugToConsole';
import { Definition } from '../Definition';
import { EndExecutionEvent } from '../Core/Message/EndExecutionEvent';
import { IConsoleHelpCommands } from './IConsoleHelpCommands';
import { ConsoleLogger } from './ConsoleLogger';

/**
 * Configuração do console como entrada de comandos.
 */
export class Console
  extends MemoryHandler<string>
  implements IConsoleHelpCommands
{
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'Console';

  /**
   * Construtor.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(propertyName: string) {
    super(propertyName, () => '');

    this.consoleLogger = new ConsoleLogger(Definition.MemoryLogger);

    this.args = HelperText.getCommandArguments(this.source);
    this.command = this.args.shift();

    Message.subscribe(EndExecutionEvent, () => {
      this.dispatchCommand();
      Console.scheduleShowDebugToConsole();
    });

    Message.subscribe(
      SendDebugToConsole,
      this.handleSendDebugToConsole.bind(this)
    );

    Message.subscribe(ShowDebugToConsole, () => this.showDebugToConsole());

    Message.subscribe(
      ReceivedConsoleCommand,
      this.handleReceivedConsoleCommand.bind(this)
    );
  }

  /**
   * Logger padrão do sistema
   * @private
   */
  private consoleLogger: ConsoleLogger;

  /**
   * Nome do comando atualmente recebido.
   * @private
   */
  private readonly command?: string;

  /**
   * Argumentos para o comando recebido.
   * @private
   */
  private readonly args: string[];

  /**
   * Ajuda para os comandos.
   */
  private helpValue: string[] = [];

  /**
   * Ajuda para os comandos.
   */
  public get help(): string[] {
    return Array<string>().concat(this.helpValue);
  }

  /**
   * Adiciona informações de linha de comando.
   * @param consoleHelpCommands
   */
  public addConsoleHelpCommands(
    consoleHelpCommands: IConsoleHelpCommands
  ): Console {
    Array.isArray(consoleHelpCommands.help)
      ? this.helpValue.push(...consoleHelpCommands.help)
      : consoleHelpCommands.help
      ? this.helpValue.push(consoleHelpCommands.help)
      : this.helpValue.push(...[]);
    return this;
  }

  /**
   * Despacha o comando recebido (se existir).
   * @private
   */
  private dispatchCommand(): void {
    if (!this.command) return;
    const processed = new ReceivedConsoleCommand(this.command, this.args).send()
      .message.processed;
    if (!processed) {
      Logger.post(
        'Use "help" to learn more. Invalid command or arguments: {0}',
        [this.command, ...this.args].join(' '),
        LogLevel.Error,
        Console.LoggerSection
      );
    }
    this.clearMemory();
  }

  /**
   * Agenda a exibição das informações de debug.
   * @private
   */
  private static scheduleShowDebugToConsole(): void {
    new ScheduleMessage(
      ShowDebugToConsole,
      HelperDate.addMinutes(Definition.IntervalInMinutesToShowDebug)
    ).send();
  }

  /**
   * Lista de mensagens para o console recebidas.
   * @private
   */
  private listOfSendDebugToConsole: SendDebugToConsole[] = [];

  /**
   * Handler de mensagem SendDebugToConsole
   * @param message
   * @private
   */
  private handleSendDebugToConsole(message: SendDebugToConsole): void {
    this.listOfSendDebugToConsole.push(message);
  }

  /**
   * Handler de mensagem ReceivedConsoleCommand
   * @param message
   * @private
   */
  private handleReceivedConsoleCommand(message: ReceivedConsoleCommand): void {
    switch (message.command) {
      case 'help':
        if (message.args.length === 0) {
          this.showHelp();
          message.processed = true;
        }
        break;
      case 'debug':
        if (message.args.length === 0) {
          new ShowDebugToConsole().send();
          message.processed = true;
        }
        break;
    }
  }

  /**
   * Exibe a ajuda dos comandos de console.
   * @private
   */
  private showHelp(): void {
    const lines = [
      ' _          _',
      '| |__   ___| |_ __',
      "| '_ \\ / _ \\ | '_ \\",
      '| | | |  __/ | |_) |',
      '|_| |_|\\___|_| .__/',
      ' for console |_|',
      ''
    ];
    if (this.help.length) {
      const replacement = Object.assign({}, Definition);
      this.help.map(section => {
        section
          .trim()
          .split('\n')
          .map(line =>
            line ? lines.push(line.querystring(replacement)) : lines.push('')
          );
        lines.push('');
      });
    } else {
      lines.push('Oops! The help is empty.');
      lines.push('');
    }
    console.log(lines.join('\n'));
    console.log();
  }

  /**
   * Exibe as mensagens coletadas no console.
   * @private
   */
  private showDebugToConsole(): void {
    if (!this.listOfSendDebugToConsole.length) return;

    const logLevel = LogLevel.Information;
    if (logLevel < this.consoleLogger.logger.minimumLevel) return;

    const lines = [
      '     _      _',
      '  __| | ___| |__  _   _  __ _',
      ' / _` |/ _ \\ `_ \\| | | |/ _` |',
      '| (_| |  __/ |_) | |_| | (_| |',
      ' \\__,_|\\___|_.__/ \\__,_|\\__, |',
      ' github.com/sergiocabral |__/',
      '',
      ''
    ];
    console.log(lines.join('\n'));

    for (const sendDebugToConsole of this.listOfSendDebugToConsole) {
      Logger.post(
        sendDebugToConsole.messageTemplate,
        sendDebugToConsole.values,
        logLevel,
        sendDebugToConsole.section
      );
    }

    console.log();
  }
}
