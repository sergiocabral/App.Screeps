import { IFilterMatch } from './IFilterMatch';
import { WrapperBase } from '../../../Wrapper/WrapperBase';
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
        (entity.instance.room &&
          filter.withRoom.find(e => e.name === entity.instance.room?.name) !==
            undefined)) &&
      (!filter.withoutRoom?.length ||
        !entity.instance.room ||
        filter.withoutRoom.find(e => e.name === entity.instance.room?.name) ===
          undefined)
    );
  }
}
