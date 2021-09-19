import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { EntityCreep } from './EntityCreep';

/**
 * Entidades do jogo.
 */
export class Entities {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(screepsEnvironment: IScreepsEnvironment) {
    this.creep = new EntityCreep(screepsEnvironment);
  }

  /**
   * Creeps.
   */
  public readonly creep: EntityCreep;
}
