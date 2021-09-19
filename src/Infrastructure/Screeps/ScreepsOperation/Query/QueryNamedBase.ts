import { QueryBase } from './QueryBase';
import { FilterNamed } from './FilterNamed';
import { WithName } from '../../../Type/WithName';
import { WrapperNamedBase } from '../../Entity/WrapperNamedBase';
import { WithId } from '../../../Type/WithId';

/**
 * Classe para consultar de entidades: com nomes
 */
export abstract class QueryNamedBase<
  TScreeps extends WithName & WithId,
  TWrapper extends WrapperNamedBase<TScreeps>,
  TQueryFilter extends FilterNamed
> extends QueryBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Busca uma entidade pelo nome.
   * @param name Nome
   * @param list Lista de entidades.
   * @protected
   */
  protected getEntityByName(name: string, list: TWrapper[]): TWrapper | null {
    return list.find(wrapper => wrapper.instance.name === name) ?? null;
  }

  /**
   * Localiza uma entidade pelo nome.
   */
  public getByName(name: string): TWrapper | null {
    return this.getEntityByName(name, this.getAll());
  }

  /**
   * Localiza uma entidade que possui uma ou mais roles.
   * @param roles
   */
  public getByRole(...roles: string[]): TWrapper[] {
    return this.getAll().filter(entity => entity.roles.has(...roles));
  }

  /**
   * Localiza uma entidade que não possui uma ou mais roles.
   * @param roles
   */
  public getWithoutRole(...roles: string[]): TWrapper[] {
    return this.getAll().filter(entity => !entity.roles.has(...roles));
  }

  /**
   * Verifica se um filtro correponde a uma entidade.
   * @param entity
   * @param filter
   * @protected
   */
  protected override match(entity: TWrapper, filter: TQueryFilter): boolean {
    return (
      super.match(entity, filter) &&
      (!filter.withName?.length ||
        filter.withName.includes(entity.instance.name)) &&
      (!filter.withoutName?.length ||
        !filter.withoutName.includes(entity.instance.name)) &&
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
