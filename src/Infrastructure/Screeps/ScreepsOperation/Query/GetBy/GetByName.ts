import { GetByBase } from './GetByBase';
import { WrapperRolesAndPropertiesBase } from '../../../Entity/WrapperIdOrNamedBase';
import { WithName } from '../../../../Type/WithName';
import { TemplateFilterWithName } from '../Filter/TemplateFilterWithName';

/**
 * Métodos para obter entidade: por nome
 */
export class GetByName<
  TScreeps extends WithName,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithName
> extends GetByBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Localiza uma entidade que possui uma ou mais nomes.
   */
  public with(...names: string[]): TWrapper[] {
    return this.query.filter({
      withName: names
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais nomes.
   */
  public without(...names: string[]): TWrapper[] {
    return this.query.filter({
      withoutName: names
    } as TQueryFilter);
  }
}
