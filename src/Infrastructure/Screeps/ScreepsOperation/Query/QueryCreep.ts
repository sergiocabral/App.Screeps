import { CreepWrapper } from '../../Entity/CreepWrapper';
import { QueryBase } from './QueryBase';

/**
 * Consulta informações do jogo: Creeps
 */
export class QueryCreep extends QueryBase {
  /**
   * Retorna a lista dos creeps existentes.
   */
  public list(): CreepWrapper[] {
    return this.getNamedEntity<Creep, CreepWrapper>(
      this.screepsEnvironment.game.creeps,
      CreepWrapper
    );
  }
}
