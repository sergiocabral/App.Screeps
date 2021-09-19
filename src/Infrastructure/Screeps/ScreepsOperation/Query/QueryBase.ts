import { KeyValue, ShouldNeverHappenError } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperBase } from '../../Entity/WrapperBase';
import { Filter } from './Filter';
import { WithId } from '../../../Type/WithId';

/**
 * Classe para consultar de entidades.
 */
export abstract class QueryBase<
  TScreeps extends WithId,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends Filter
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
   * Verifica se um filtro correponde a uma entidade.
   * @param entity
   * @param filter
   * @protected
   */
  protected match(entity: TWrapper, filter: TQueryFilter): boolean {
    return (
      (!filter.withId?.length ||
        filter.withId.includes(String(entity.instance.id))) &&
      (!filter.withoutId?.length ||
        !filter.withoutId.includes(String(entity.instance.id)))
    );
  }

  /**
   * Filtar uma lista
   * @param filter
   * @param list
   */
  public filter(filter: TQueryFilter, list?: TWrapper[]): TWrapper[] {
    return (list ?? this.getAll()).filter(entity => this.match(entity, filter));
  }
}
