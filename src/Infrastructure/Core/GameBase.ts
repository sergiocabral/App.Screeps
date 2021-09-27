import { EmptyError, Logger, LogLevel } from '@sergiocabral/helper';
import { IScreepsOperation } from '../Screeps/ScreepsOperation/IScreepsOperation';
import { IGame } from './IGame';
import { ScheduledMessage } from '../Schedule/Message/ScheduledMessage';
import { ToText } from '../Helper/ToText';
import { DebugStepByStep } from '../Type/DebugStepByStep';
import { MemoryHandler } from './MemoryHandler';

/**
 * Estrutura base para modos de jogo.
 */
export abstract class GameBase
  extends MemoryHandler<Record<string, unknown>>
  implements IGame
{
  /**
   * Construtor.
   * @param debug Modo de debug durante o loop.
   */
  public constructor(debug?: DebugStepByStep) {
    super('executor', () => {
      return {};
    });
    this.debugEnabled = Boolean(debug);
  }

  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  public scheduledMessageTypes: typeof ScheduledMessage[] = [];

  /**
   * Ajuda para os comandos.
   */
  public get help(): string[] | string {
    return [];
  }

  /**
   * Ativa a saída da função debug.
   * @protected
   */
  protected debugEnabled = false;

  /**
   * Sinaliza se alguma mensagem de debug foi exibida.
   * @private
   */
  private debugShowed = false;

  /**
   * Exibe mensagem de debug.
   * @param message
   * @param values
   * @private
   */
  protected debug(message: string, values?: unknown): void {
    if (this.debugEnabled) {
      Logger.post(message, values, LogLevel.Verbose, 'STEP-BY-STEP');
      this.debugShowed = true;
    }
  }

  /**
   * Objetos presentes no ambiente do Screeps
   * @private
   */
  private screepsOperationValue: IScreepsOperation | null = null;

  /**
   * Objetos presentes no ambiente do Screeps
   * @private
   */
  protected get screepsOperation(): IScreepsOperation {
    if (this.screepsOperationValue === null) {
      throw new EmptyError('Value is not defined.');
    }
    return this.screepsOperationValue;
  }

  /**
   * Inicializa a classe.
   * @param screepsOperation
   * @private
   */
  protected initialize(screepsOperation: IScreepsOperation): void {
    this.screepsOperationValue = screepsOperation;
  }

  /**
   * Implementada a lógica do loop do jogo.
   * @param screepsOperation Propriedades que lidam diretamente com o ambiente do Screeps.
   */
  public loop(screepsOperation: IScreepsOperation): void {
    this.initialize(screepsOperation);
    this.do();
    if (this.debugShowed) console.log(' ');
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  protected abstract do(): void;

  /**
   * Override para toString().
   */
  public override readonly toString = (): string => {
    return ToText.instance(this, [
      'do',
      'loop',
      'help',
      'propertyName',
      'debugShowed',
      'debugEnabled',
      'debug',
      'memory',
      'useGarbageCollector'
    ]);
  };
}
