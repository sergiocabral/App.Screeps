import { Message } from '@sergiocabral/helper';
import { IScreepsOperation } from '../../Screeps/ScreepsOperation/IScreepsOperation';

/**
 * Abstração para um evento relacionado a execução do jogo.
 */
export abstract class ExecutionEventBase extends Message {
  /**
   * Construtor.
   * @param screepsEnvironment Objetos do Screeps.
   */
  public constructor(public readonly screepsEnvironment: IScreepsOperation) {
    super();
  }
}
