import { IFilterMatch } from './IFilterMatch';
import { WrapperRolesAndPropertiesBase } from '../../../Wrapper/WrapperIdOrNamedBase';
import { WithName } from '../../../../Type/WithName';
import { WithId } from '../../../../Type/WithId';
import { TemplateFilterWithProperties } from '../Filter/TemplateFilterWithProperties';

/**
 * Filtro para nome.
 */
export class FilterMatchProperties<
  TScreeps extends WithName | WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithProperties
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
      (filter.withEmptyProperties === undefined ||
        (filter.withEmptyProperties &&
          Object.keys(entity.properties.dataset).length === 0) ||
        (!filter.withEmptyProperties &&
          Object.keys(entity.properties.dataset).length > 0)) &&
      (!filter.withProperties?.length ||
        entity.properties.has(...(filter.withProperties ?? []))) &&
      (!filter.withoutProperties?.length ||
        !entity.properties.has(...(filter.withoutProperties ?? []))) &&
      (!filter.withPropertyValues?.length ||
        entity.properties.match(filter.withPropertyValues)) &&
      (!filter.withoutPropertyValues?.length ||
        !entity.properties.match(filter.withoutPropertyValues))
    );
  }
}
