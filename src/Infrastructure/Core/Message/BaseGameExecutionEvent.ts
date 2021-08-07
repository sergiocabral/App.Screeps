import { Message } from '@sergiocabral/helper';
import { IScreepsOperation } from '../../Screeps/IScreepsOperation';

/**
 * Abstração para um evento relacionado a execução do jogo.
 */
export abstract class BaseGameExecutionEvent extends Message {
  /**
   * Construtor.
   * @param screepsEnvironment Objetos do Screeps.
   */
  public constructor(public readonly screepsEnvironment: IScreepsOperation) {
    super();
  }
}
