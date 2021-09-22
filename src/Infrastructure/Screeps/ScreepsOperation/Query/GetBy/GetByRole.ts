import { GetByBase } from './GetByBase';
import { WithId } from '../../../../Type/WithId';
import { WithName } from '../../../../Type/WithName';
import { WrapperRolesAndPropertiesBase } from '../../../Wrapper/WrapperIdOrNamedBase';
import { TemplateFilterWithRoles } from '../Filter/TemplateFilterWithRoles';

/**
 * Métodos para obter entidade: por roles
 */
export class GetByRole<
  TScreeps extends WithId | WithName,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithRoles
> extends GetByBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Localiza uma entidade que possui zero ou alguma role
   * @param empty
   */
  public empty(empty = true): TWrapper[] {
    return this.query.filter({
      withEmptyRoles: empty
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que possui uma ou mais roles.
   */
  public with(...roles: string[]): TWrapper[] {
    return this.query.filter({
      withRoles: roles
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais roles.
   */
  public without(...roles: string[]): TWrapper[] {
    return this.query.filter({
      withoutRoles: roles
    } as TQueryFilter);
  }
}
