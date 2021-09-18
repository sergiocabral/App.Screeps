import { IScreepsEnvironment } from '../IScreepsEnvironment';

/**
 * Base para entidades do jogo
 */
export abstract class EntityBase {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(protected screepsEnvironment: IScreepsEnvironment) {}
}
