import { InvalidExecutionError, KeyValue } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperBase } from '../../Wrapper/WrapperBase';
import { TemplateFilter } from './Filter/TemplateFilter';
import { IFilterMatch } from './FilterMatch/IFilterMatch';
import { ToText } from '../../../Helper/ToText';

/**
 * Classe para consultar de entidades.
 */
export abstract class QueryBase<
  TScreeps,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilter,
  TPreFilter = undefined
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(protected screepsEnvironment: IScreepsEnvironment) {}

  /**
   * Obriga utilizar um pré-filtro antes de qualquer chamada.
   * @protected
   */
  protected preFilterEnabled = false;

  /**
   * Determina se o pré-filtro foi chamado.
   * @private
   */
  private preFilterCalled = false;

  /**
   * Valor do pré-filtro definido.
   * @private
   */
  private preFilterDefinedValue: TPreFilter =
    undefined as unknown as TPreFilter;

  /**
   * Valor do pré-filtro definido.
   * @private
   */
  private get preFilterDefined(): TPreFilter {
    if (!this.preFilterCalled) {
      throw new InvalidExecutionError(
        'Call preFilter() is mandatory for {0}'.querystring(
          this.constructor.name
        )
      );
    }
    this.preFilterCalled = false;
    return this.preFilterDefinedValue;
  }

  /**
   * Define um pré-filtro que determina o conjunto de instâncias disponíveis para consulta.
   * @param preFilter
   * @protected
   */
  public preFilter(preFilter: TPreFilter): this {
    this.preFilterDefinedValue = preFilter;
    this.preFilterCalled = true;
    return this;
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
    const preFilter = this.preFilterEnabled
      ? this.preFilterDefined
      : (undefined as unknown as TPreFilter);
    const instances = this.getInstances(preFilter);
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
  public readonly toString = (): string => {
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
