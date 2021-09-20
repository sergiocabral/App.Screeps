import { IFilterMatch } from './IFilterMatch';
import { TemplateFilterWithRolesAndProperties } from '../Filter/TemplateFilterWithRolesAndProperties';
import { WrapperRolesAndPropertiesBase } from '../../../Entity/WrapperIdOrNamedBase';
import { WithName } from '../../../../Type/WithName';
import { WithId } from '../../../../Type/WithId';

/**
 * Filtro para nome.
 */
export class FilterMatchRolesAndProperties<
  TScreeps extends WithName | WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithRolesAndProperties
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
      (!filter.withRoles?.length ||
        entity.roles.has(...(filter.withRoles ?? []))) &&
      (!filter.withoutRoles?.length ||
        !entity.roles.has(...(filter.withoutRoles ?? []))) &&
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
