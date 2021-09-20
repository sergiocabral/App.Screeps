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
   * Localiza uma entidade que possui uma ou mais ids.
   */
  public getWithId(...ids: string[]): TWrapper | undefined {
    const filter: TemplateFilterWithId = {
      withId: ids
    };
    return this.filter(filter as TQueryFilter)[0];
  }

  /**
   * Localiza uma entidade que não possui uma ou mais ids.
   */
  public getWithoutId(...ids: string[]): TWrapper | undefined {
    const filter: TemplateFilterWithId = {
      withoutId: ids
    };
    return this.filter(filter as TQueryFilter)[0];
  }

  /**
   * Localiza uma entidade que possui uma ou mais nomes.
   */
  public getWithName(...names: string[]): TWrapper | undefined {
    const filter: TemplateFilterWithName = {
      withName: names
    };
    return this.filter(filter as TQueryFilter)[0];
  }

  /**
   * Localiza uma entidade que não possui uma ou mais nomes.
   */
  public getWithoutName(...names: string[]): TWrapper | undefined {
    const filter: TemplateFilterWithName = {
      withoutName: names
    };
    return this.filter(filter as TQueryFilter)[0];
  }

  /**
   * Localiza uma entidade que possui uma ou mais roles.
   */
  public getWithRole(...roles: string[]): TWrapper[] {
    return this.filter({
      withRoles: roles
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais roles.
   */
  public getWithoutRole(...roles: string[]): TWrapper[] {
    return this.filter({
      withoutRoles: roles
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que possui uma ou mais propriedades.
   */
  public getWithProperties(...properties: string[]): TWrapper[] {
    return this.filter({
      withProperties: properties
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais propriedades.
   */
  public getWithoutProperties(...properties: string[]): TWrapper[] {
    return this.filter({
      withoutProperties: properties
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que possui uma propriedade com um ou mais valores.
   */
  public getByPropertyValues(
    property: string,
    ...values: string[]
  ): TWrapper[] {
    return this.filter({
      withPropertyValues: [property, values]
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma propriedade com um ou mais valores.
   */
  public getWithoutPropertyValues(
    property: string,
    ...values: string[]
  ): TWrapper[] {
    return this.filter({
      withPropertyValues: [property, values]
    } as TQueryFilter);
  }
}
