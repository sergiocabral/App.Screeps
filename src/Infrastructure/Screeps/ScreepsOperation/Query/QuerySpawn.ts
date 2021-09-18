import { QueryBase } from './QueryBase';
import { SpawnWrapper } from '../../Entity/SpawnWrapper';

/**
 * Consulta informações do jogo: Spawn
 */
export class QuerySpawn extends QueryBase<StructureSpawn, SpawnWrapper> {
  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override readonly instances = this.screepsEnvironment.game.spawns;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly wrapperConstructor = SpawnWrapper;
}
