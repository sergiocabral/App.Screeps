import { CreepWrapper } from '../../Entity/CreepWrapper';
import { QueryBase } from './QueryBase';

/**
 * Consulta informações do jogo: Creeps
 */
export class QueryCreep extends QueryBase<Creep, CreepWrapper> {
  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override readonly instances = this.screepsEnvironment.game.creeps;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly wrapperConstructor = CreepWrapper;
}
