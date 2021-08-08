import {
  HelperDate,
  HelperText,
  Logger,
  LogLevel,
  Message
} from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from './ReceivedConsoleCommand';
import { MemoryHandler } from '../Core/MemoryHandler';
import { SendDebugToConsole } from './Message/SendDebugToConsole';
import { ScheduleMessage } from '../Schedule/Message/ScheduleMessage';
import { ShowDebugToConsole } from './Message/ShowDebugToConsole';
import { Definition } from '../Definition';
import { BeginExecutionEvent } from '../Core/Message/BeginExecutionEvent';
import { IConsoleHelpCommands } from './IConsoleHelpCommands';

/**
 * Configuração do console como entrada de comandos.
 */
export class Console
  extends MemoryHandler<string>
  implements IConsoleHelpCommands
{
  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(memory: Memory, propertyName: string) {
    super(memory, propertyName, () => '');
    this.args = HelperText.getCommandArguments(this.source);
    this.command = this.args.shift();
    Message.subscribe(BeginExecutionEvent, () => {
      this.dispatchCommand();
      this.scheduleShowDebugToConsole();
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
    void new ReceivedConsoleCommand(this.command, this.args).send();
    this.clearMemory();
  }

  /**
   * Agenda a exibição das informações de debug.
   * @private
   */
  private scheduleShowDebugToConsole(): void {
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
        this.showHelp();
        break;
      case 'debug':
        new ShowDebugToConsole().send();
        break;
    }
  }

  /**
   * Exibe a ajuda dos comandos de console.
   * @private
   */
  private showHelp(): void {
    console.log();
    console.log(' _          _');
    console.log('| |__   ___| |_ __');
    console.log("| '_ \\ / _ \\ | '_ \\");
    console.log('| | | |  __/ | |_) |');
    console.log('|_| |_|\\___|_| .__/');
    console.log(' for console |_|');
    console.log();
    if (this.help.length) {
      const replacement = Object.assign({}, Definition);
      this.help.map(section => {
        section
          .trim()
          .split('\n')
          .map(line =>
            line ? console.log(line.querystring(replacement)) : console.log()
          );
        console.log();
      });
    } else {
      console.log('Oops! The help is empty.');
      console.log();
    }
  }

  /**
   * Exibe as mensagens coletadas no console.
   * @private
   */
  private showDebugToConsole(): void {
    if (!this.listOfSendDebugToConsole.length) return;

    console.log();
    console.log('     _      _');
    console.log('  __| | ___| |__  _   _  __ _');
    console.log(' / _` |/ _ \\ `_ \\| | | |/ _` |');
    console.log('| (_| |  __/ |_) | |_| | (_| |');
    console.log(' \\__,_|\\___|_.__/ \\__,_|\\__, |');
    console.log(' github.com/sergiocabral |__/');
    console.log();

    for (const sendDebugToConsole of this.listOfSendDebugToConsole) {
      Logger.post(
        sendDebugToConsole.messageTemplate,
        sendDebugToConsole.values,
        LogLevel.Debug,
        sendDebugToConsole.section
      );
    }

    console.log();
  }
}
