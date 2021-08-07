import { HelperText, Message } from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from './ReceivedConsoleCommand';
import { MemoryHandler } from '../Core/MemoryHandler';
import { BeforeGameExecutionEvent } from '../Core/Message/BeforeGameExecutionEvent';

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
    Message.subscribe(
      BeforeGameExecutionEvent,
      this.handleBeforeGameExecutionEvent.bind(this)
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
   * Handler de mensagem BeforeGameExecutionEvent
   * @private
   */
  private handleBeforeGameExecutionEvent(): void {
    if (!this.command) return;
    void new ReceivedConsoleCommand(this.command, this.args).send();
    this.clearMemory();
  }
}
