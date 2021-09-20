import { WrapperBase } from '../../../Entity/WrapperBase';
import { WithId } from '../../../../Type/WithId';
import { TemplateFilterWithId } from '../Filter/TemplateFilterWithId';
import { IFilterMatch } from './IFilterMatch';
import { WithName } from '../../../../Type/WithName';
import { IdentifyIdentifier } from '../../IdentifyIdentifier';
import { TemplateFilterWithName } from '../Filter/TemplateFilterWithName';
import { PropertyIdentifier } from '../../../../Type/PropertyIdentifier';

/**
 * Filtro para id ou nome.
 */
export class FilterMatchIdOrName<
  TScreeps extends WithId | WithName,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithId | TemplateFilterWithName
> implements IFilterMatch<TScreeps, TWrapper, TQueryFilter>
{
  /**
   * Verifica o filtro para ums instância com id.
   * @param instance
   * @param filter
   */
  private static failById(
    instance: WithId,
    filter: TemplateFilterWithId
  ): boolean {
    return !(
      (!filter.withId?.length || filter.withId.includes(String(instance.id))) &&
      (!filter.withoutId?.length ||
        !filter.withoutId.includes(String(instance.id)))
    );
  }

  /**
   * Verifica o filtro para ums instância com name.
   * @param instance
   * @param filter
   */
  private static failByName(
    instance: WithName,
    filter: TemplateFilterWithName
  ): boolean {
    return !(
      (!filter.withName?.length ||
        filter.withName.includes(String(instance.name))) &&
      (!filter.withoutName?.length ||
        !filter.withoutName.includes(String(instance.name)))
    );
  }

  /**
   * Verifica o filtro.
   * @param entity
   * @param filter
   * @private
   */
  public fail(entity: TWrapper, filter: TQueryFilter): boolean {
    const identifiers = IdentifyIdentifier.verify(entity.instance);
    return (
      (identifiers.includes(PropertyIdentifier.Id) &&
        FilterMatchIdOrName.failById(
          entity.instance as WithId,
          filter as TemplateFilterWithId
        )) ||
      (identifiers.includes(PropertyIdentifier.Name) &&
        FilterMatchIdOrName.failByName(
          entity.instance as WithName,
          filter as TemplateFilterWithName
        ))
    );
  }
}
