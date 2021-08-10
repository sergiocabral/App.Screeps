import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { CreepWrapper } from '../Entity/CreepWrapper';

/**
 * Entidades do jogo.
 */
export class Entity {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(private screepsEnvironment: IScreepsEnvironment) {}

  creep(creep: Creep): CreepWrapper {
    return new CreepWrapper(creep, this.screepsEnvironment);
  }
}
