import { GetByBase } from './GetByBase';
import { WithId } from '../../../../Type/WithId';
import { WithName } from '../../../../Type/WithName';
import { WrapperRolesAndPropertiesBase } from '../../../Wrapper/WrapperIdOrNamedBase';
import { TemplateFilterWithProperties } from '../Filter/TemplateFilterWithProperties';

/**
 * Métodos para obter entidade: por propriedades
 */
export class GetByProperty<
  TScreeps extends WithId | WithName,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithProperties,
  TPreFilter
> extends GetByBase<TScreeps, TWrapper, TQueryFilter, TPreFilter> {
  /**
   * Localiza uma entidade que possui zero ou alguma propriedades
   * @param empty
   */
  public empty(empty = true): TWrapper[] {
    return this.query.filter({
      withEmptyProperties: empty
    } as TQueryFilter);
  }

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
