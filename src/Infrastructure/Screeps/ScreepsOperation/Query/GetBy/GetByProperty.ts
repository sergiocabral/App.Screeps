import { GetByBase } from './GetByBase';
import { WithId } from '../../../../Type/WithId';
import { WithName } from '../../../../Type/WithName';
import { TemplateFilterWithRolesAndProperties } from '../Filter/TemplateFilterWithRolesAndProperties';
import { WrapperRolesAndPropertiesBase } from '../../../Entity/WrapperIdOrNamedBase';

/**
 * Métodos para obter entidade: por propriedades
 */
export class GetByProperty<
  TScreeps extends WithId | WithName,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithRolesAndProperties
> extends GetByBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Localiza uma entidade que possui uma ou mais propriedades.
   */
  public with(...properties: string[]): TWrapper[] {
    return this.query.filter({
      withProperties: properties
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais propriedades.
   */
  public without(...properties: string[]): TWrapper[] {
    return this.query.filter({
      withoutProperties: properties
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que possui uma propriedade com um ou mais valores.
   */
  public withValue(property: string, ...values: string[]): TWrapper[] {
    return this.query.filter({
      withPropertyValues: [property, values]
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma propriedade com um ou mais valores.
   */
  public withoutValue(property: string, ...values: string[]): TWrapper[] {
    return this.query.filter({
      withPropertyValues: [property, values]
    } as TQueryFilter);
  }
}
