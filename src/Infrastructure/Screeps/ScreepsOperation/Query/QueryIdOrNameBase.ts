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
import { GetByRole } from './GetBy/GetByRole';
import { GetByProperty } from './GetBy/GetByProperty';

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
   * Consulta por: role
   */
  public readonly getByRole = new GetByRole(this);

  /**
   * Consulta por: propriedades
   */
  public readonly getByProperty = new GetByProperty(this);
}
