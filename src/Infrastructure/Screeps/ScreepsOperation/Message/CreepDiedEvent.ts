import { Message } from '@sergiocabral/helper';

/**
 * Sinaliza que um creep morreu.
 */
export class CreepDiedEvent extends Message {
  /**
   * Construtor.
   * @param creepName Nome do creep.
   * @param data Dados descartados.
   */
  public constructor(public creepName: string, public data: CreepMemory) {
    super();
  }
}
