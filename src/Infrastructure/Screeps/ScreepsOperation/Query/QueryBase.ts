import { KeyValue, ShouldNeverHappenError } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperBase } from '../../Wrapper/WrapperBase';
import { TemplateFilter } from './Filter/TemplateFilter';
import { IFilterMatch } from './FilterMatch/IFilterMatch';

/**
 * Classe para consultar de entidades.
 */
export abstract class QueryBase<
  TScreeps,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilter
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(protected screepsEnvironment: IScreepsEnvironment) {}

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected abstract get instances(): KeyValue<TScreeps>;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected abstract get wrapperConstructor(): new (
    instance: TScreeps,
    screepsEnvironment: IScreepsEnvironment
  ) => TWrapper;

  /**
   * Retorna a lista das entidades existentes.
   * @param instances Lista de instâncias do Screeps.
   * @param ctor Constrói um wrapper para a instâncias do Screeps
   * @private
   */
  protected getEntities(
    instances: KeyValue<TScreeps>,
    ctor: new (
      instance: TScreeps,
      screepsEnvironment: IScreepsEnvironment
    ) => TWrapper
  ): TWrapper[] {
    return Object.keys(instances).map(name => {
      const entity = instances[name];
      if (entity === undefined) throw new ShouldNeverHappenError();
      return new ctor(entity, this.screepsEnvironment);
    });
  }

  /**
   * Retorna a lista de entidade existentes.
   */
  public getAll(): TWrapper[] {
    return this.getEntities(this.instances, this.wrapperConstructor);
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
}
