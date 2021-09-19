import { SpawnWrapper } from '../../Entity/SpawnWrapper';
import { QueryNamedBase } from './QueryNamedBase';
import { FilterSpawn } from './FilterSpawn';

/**
 * Classe para consultar de entidades: Spawn
 */
export class QuerySpawn extends QueryNamedBase<
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

  /**
   * Verifica se um filtro correponde a uma entidade.
   * @param entity
   * @param filter
   * @protected
   */
  protected override match(entity: SpawnWrapper, filter: FilterSpawn): boolean {
    return super.match(entity, filter);
  }
}
