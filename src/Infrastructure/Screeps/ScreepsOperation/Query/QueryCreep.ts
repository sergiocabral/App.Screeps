import { CreepWrapper } from '../../Entity/CreepWrapper';
import { FilterCreep } from './FilterCreep';
import { QueryNamedBase } from './QueryNamedBase';

/**
 * Classe para consultar de entidades: Creeps
 */
export class QueryCreep extends QueryNamedBase<
  Creep,
  CreepWrapper,
  FilterCreep
> {
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

  /**
   * Verifica se um filtro correponde a uma entidade.
   * @param entity
   * @param filter
   * @protected
   */
  protected override match(entity: CreepWrapper, filter: FilterCreep): boolean {
    return (
      super.match(entity, filter) &&
      (!filter.withSpawn?.length ||
        filter.withSpawn.find(
          e => e.instance.room.name === entity.instance.room.name
        ) !== undefined) &&
      (!filter.withoutSpawn?.length ||
        filter.withoutSpawn.find(
          e => e.instance.room.name === entity.instance.room.name
        ) === undefined)
    );
  }
}
