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

/**
 * Configuração do console como entrada de comandos.
 */
export class Console extends MemoryHandler<string> {
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
      HelperDate.addMinutes(Definition.intervalInMinutesToShowDebug)
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
    if (message.command === Definition.commandList.showDebugToConsole) {
      new ShowDebugToConsole().send();
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
