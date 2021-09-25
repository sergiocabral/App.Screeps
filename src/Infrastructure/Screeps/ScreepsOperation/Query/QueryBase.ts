import { KeyValue } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperBase } from '../../Wrapper/WrapperBase';
import { TemplateFilter } from './Filter/TemplateFilter';
import { IFilterMatch } from './FilterMatch/IFilterMatch';
import { ToText } from '../../../Helper/ToText';
import { PreFilter } from '../../../Data/PreFilter';

/**
 * Classe para consultar de entidades.
 */
export abstract class QueryBase<
  TScreeps,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilter,
  TPreFilter = undefined
> extends PreFilter<TPreFilter> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(protected screepsEnvironment: IScreepsEnvironment) {
    super();
    this.preFilterEnabled = false;
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected abstract getInstances(
    preFilter: TPreFilter
  ): KeyValue<TScreeps> | TScreeps[];

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected abstract get createWrapper(): new (
    instance: TScreeps,
    screepsEnvironment: IScreepsEnvironment
  ) => TWrapper;

  /**
   * Retorna a lista de entidade existentes.
   */
  public getAll(): TWrapper[] {
    const instances = this.getInstances(this.preFilterValue);
    const entities = !Array.isArray(instances)
      ? Object.values(instances)
      : instances;
    return entities.map(
      entity => new this.createWrapper(entity, this.screepsEnvironment)
    );
  }

  /**
   * Lista de filtros.
   * @protected
   */
  protected readonly filters: IFilterMatch<TScreeps, TWrapper, TQueryFilter>[] =
    [];

  /**
   * Verifica se um filtro correponde a uma entidade.
   * @param entity
   * @param filter
   * @protected
   */
  private fail(entity: TWrapper, filter: TQueryFilter): boolean {
    for (const filterTest of this.filters) {
      if (filterTest.fail(entity, filter)) return true;
    }
    return false;
  }

  /**
   * Filtar uma lista
   * @param filter
   * @param list
   */
  public filter(filter: TQueryFilter, list?: TWrapper[]): TWrapper[] {
    return (list ?? this.getAll()).filter(entity => !this.fail(entity, filter));
  }

  /**
   * Override para toString().
   */
  public override readonly toString = (): string => {
    return ToText.instance(this, [
      'filters',
      'fail',
      'getInstances',
      'getEntities',
      'createWrapper',
      'preFilterEnabled',
      'preFilterCalled',
      'preFilterDefined',
      'preFilterDefinedValue',
      'memoryEntryForGarbageCollector'
    ]);
  };
}
