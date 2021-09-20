import { SpawnWrapper } from '../../Entity/SpawnWrapper';
import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { FilterSpawn } from './Filter/FilterSpawn';

/**
 * Classe para consultar de entidades: Spawn
 */
export class QuerySpawn extends QueryIdOrNameBase<
  StructureSpawn,
  SpawnWrapper,
  FilterSpawn
> {
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
