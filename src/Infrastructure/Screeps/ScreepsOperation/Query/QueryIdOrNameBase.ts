import { QueryBase } from './QueryBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { TemplateFilterWithRolesAndProperties } from './Filter/TemplateFilterWithRolesAndProperties';
import { WrapperRolesAndPropertiesBase } from '../../Entity/WrapperIdOrNamedBase';
import { WithName } from '../../../Type/WithName';
import { WithId } from '../../../Type/WithId';
import { TemplateFilterWithId } from './Filter/TemplateFilterWithId';
import { TemplateFilterWithName } from './Filter/TemplateFilterWithName';
import { FilterMatchIdOrName } from './FilterMatch/FilterMatchIdOrName';
import { FilterMatchRolesAndProperties } from './FilterMatch/FilterMatchRolesAndProperties';
import { PropertyIdentifier } from '../../../Type/PropertyIdentifier';
import { IdentifyIdentifier } from '../IdentifyIdentifier';

/**
 * Classe para consultar de entidades: com id ou nome
 */
export abstract class QueryIdOrNameBase<
  TScreeps extends WithName | WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends (TemplateFilterWithId | TemplateFilterWithName) &
    TemplateFilterWithRolesAndProperties
> extends QueryBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.filters.push(
      new FilterMatchIdOrName<TScreeps, TWrapper, TQueryFilter>()
    );
    this.filters.push(
      new FilterMatchRolesAndProperties<TScreeps, TWrapper, TQueryFilter>()
    );
  }

  /**
   * Determina a propriedade de identificação da instância do Screeps.
   * @private
   */
  private entityIdentifierValue: PropertyIdentifier[] = [];

  /**
   * Determina a propriedade de identificação da instância do Screeps.
   * @private
   */
  private get entityIdentifier(): PropertyIdentifier[] {
    if (this.entityIdentifierValue.length === 0) {
      const [instance] = Object.values(this.instances);
      this.entityIdentifierValue.push(...IdentifyIdentifier.verify(instance));
    }
    return this.entityIdentifierValue;
  }

  /**
   * Localiza uma entidade pelo id.
   */
  public getById(id: string): TWrapper | null {
    if (!this.entityIdentifier.includes(PropertyIdentifier.Id)) return null;
    return (
      this.getAll().find(wrapper => (wrapper.instance as WithId).id === id) ??
      null
    );
  }

  /**
   * Localiza uma entidade pelo nome.
   */
  public getByName(name: string): TWrapper | null {
    if (!this.entityIdentifier.includes(PropertyIdentifier.Name)) return null;
    return (
      this.getAll().find(
        wrapper => (wrapper.instance as WithName).name === name
      ) ?? null
    );
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
}
