import { KeyValue, ShouldNeverHappenError } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperBase } from '../../Entity/WrapperBase';
import { Named } from '../../../Type/Named';
import { QueryFilter } from './QueryFilter';

/**
 * Classe base para consultar informações do jogo.
 */
export abstract class QueryBase<
  TScreeps extends Named,
  TWrapper extends WrapperBase<TScreeps>
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
   * Busca uma entidade pelo nome.
   * @param name Nome
   * @param list Lista de entidades.
   * @protected
   */
  protected getEntityByName(name: string, list: TWrapper[]): TWrapper | null {
    return list.find(wrapper => wrapper.instance.name === name) ?? null;
  }

  /**
   * Retorna a lista de entidade existentes.
   */
  public getAll(): TWrapper[] {
    return this.getEntities(this.instances, this.wrapperConstructor);
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
   * Filtar uma lista
   * @param filter
   * @param list
   */
  public filter(filter: QueryFilter, list?: TWrapper[]): TWrapper[] {
    return (list ?? this.getAll()).filter(entity => {
      return (
        (filter.withName === undefined ||
          filter.withName === entity.instance.name) &&
        (filter.withoutName === undefined ||
          filter.withoutName !== entity.instance.name) &&
        (!filter.withRoles?.length ||
          entity.roles.has(...(filter.withRoles ?? []))) &&
        (!filter.withoutRoles?.length ||
          !entity.roles.has(...(filter.withoutRoles ?? [])))
      );
    });
  }
}
