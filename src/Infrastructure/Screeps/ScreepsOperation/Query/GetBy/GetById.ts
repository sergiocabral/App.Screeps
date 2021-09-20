import { TemplateFilterWithId } from '../Filter/TemplateFilterWithId';
import { GetByBase } from './GetByBase';
import { WithId } from '../../../../Type/WithId';
import { WrapperRolesAndPropertiesBase } from '../../../Entity/WrapperIdOrNamedBase';

/**
 * Métodos para obter entidade: por id
 */
export class GetById<
  TScreeps extends WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithId
> extends GetByBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Localiza uma entidade que possui uma ou mais ids.
   */
  public with(...ids: string[]): TWrapper[] {
    return this.query.filter({
      withId: ids
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais ids.
   */
  public without(...ids: string[]): TWrapper[] {
    return this.query.filter({
      withoutId: ids
    } as TQueryFilter);
  }
}
