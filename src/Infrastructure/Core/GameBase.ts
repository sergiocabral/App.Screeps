import { EmptyError } from '@sergiocabral/helper';
import { IScreepsOperation } from '../Screeps/ScreepsOperation/IScreepsOperation';
import { IGame } from './IGame';
import { ScheduledMessage } from '../Schedule/Message/ScheduledMessage';

/**
 * Estrutura base para modos de jogo.
 */
export abstract class GameBase implements IGame {
  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  public scheduledMessageTypes: typeof ScheduledMessage[] = [];

  /**
   * Ajuda para os comandos.
   */
  public help = 'Modo atual do jogo: indefinido.';

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
  private initialize(screepsOperation: IScreepsOperation) {
    this.screepsOperationValue = screepsOperation;
  }

  /**
   * Implementada a lógica do loop do jogo.
   * @param screepsOperation Propriedades que lidam diretamente com o ambiente do Screeps.
   */
  public loop(screepsOperation: IScreepsOperation): void {
    this.initialize(screepsOperation);
    this.do();
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  protected abstract do(): void;
}
