import { IFilterMatch } from './IFilterMatch';
import { WrapperBase } from '../../../Entity/WrapperBase';
import { TemplateFilterWithRoom } from '../Filter/TemplateFilterWithRoom';
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
      (!filter.withRoom?.length ||
        filter.withRoom.find(e => e.name === entity.instance.room.name) !==
          undefined) &&
      (!filter.withoutRoom?.length ||
        filter.withoutRoom.find(e => e.name === entity.instance.room.name) ===
          undefined)
    );
  }
}
