import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { EntityCreep } from './EntityCreep';
import { EntityFlag } from './EntityFlag';

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
    this.flag = new EntityFlag(screepsEnvironment);
  }

  /**
   * Creeps.
   */
  public readonly creep: EntityCreep;

  /**
   * Flag
   */
  public readonly flag: EntityFlag;
}
