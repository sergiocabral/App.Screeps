import { QueryBase } from './QueryBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from '../../Entity/WrapperIdOrNamedBase';
import { WithName } from '../../../Type/WithName';
import { WithId } from '../../../Type/WithId';
import { TemplateFilterWithId } from './Filter/TemplateFilterWithId';
import { TemplateFilterWithName } from './Filter/TemplateFilterWithName';
import { FilterMatchIdOrName } from './FilterMatch/FilterMatchIdOrName';
import { FilterMatchProperties } from './FilterMatch/FilterMatchProperties';
import { GetByRole } from './GetBy/GetByRole';
import { GetByProperty } from './GetBy/GetByProperty';
import { TemplateFilterWithRoles } from './Filter/TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './Filter/TemplateFilterWithProperties';
import { FilterMatchRoles } from './FilterMatch/FilterMatchRoles';

/**
 * Classe para consultar de entidades: com id ou nome
 */
export abstract class QueryIdOrNameBase<
  TScreeps extends WithName | WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends (TemplateFilterWithId | TemplateFilterWithName) &
    TemplateFilterWithRoles &
    TemplateFilterWithProperties
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
    this.filters.push(new FilterMatchRoles<TScreeps, TWrapper, TQueryFilter>());
    this.filters.push(
      new FilterMatchProperties<TScreeps, TWrapper, TQueryFilter>()
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
