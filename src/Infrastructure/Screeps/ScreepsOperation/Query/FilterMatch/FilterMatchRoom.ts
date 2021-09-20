import { IFilterMatch } from './IFilterMatch';
import { TemplateFilterWithRoom } from '../Filter/TemplateFilterWithRoom';
import { WrapperBase } from '../../../Entity/WrapperBase';
import { WithRoom } from '../../../../Type/WithRoom';

/**
 * Filtro para entidades dentro de salas.
 */
export class FilterMatchRoom<
  TScreeps extends WithRoom,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithRoom
> implements IFilterMatch<TScreeps, TWrapper, TQueryFilter>
{
  /**
   * Verifica o filtro.
   * @param entity
   * @param filter
   * @private
   */
  public fail(entity: TWrapper, filter: TQueryFilter): boolean {
    return !(
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
