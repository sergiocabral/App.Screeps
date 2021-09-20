import { IFilterMatch } from './IFilterMatch';
import { WrapperRolesAndPropertiesBase } from '../../../Entity/WrapperIdOrNamedBase';
import { WithName } from '../../../../Type/WithName';
import { WithId } from '../../../../Type/WithId';
import { TemplateFilterWithRoles } from '../Filter/TemplateFilterWithRoles';

/**
 * Filtro para nome.
 */
export class FilterMatchRoles<
  TScreeps extends WithName | WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithRoles
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
        !entity.roles.has(...(filter.withoutRoles ?? [])))
    );
  }
}
