import { KeyValue, ShouldNeverHappenError } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { BaseWrapper } from '../../Entity/BaseWrapper';
import { Named } from '../../../Type/Named';

/**
 * Classe base para consultar informações do jogo.
 */
export class QueryBase {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(protected screepsEnvironment: IScreepsEnvironment) {}

  /**
   * Retorna a lista das entidades existentes.
   * @param instances Lista de instâncias do Screeps.
   * @param ctor Constrói um wrapper para a instâncias do Screeps
   * @private
   */
  protected getNamedEntities<
    TScreeps extends Named,
    TWrapper extends BaseWrapper<TScreeps>
  >(
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
  protected getNamedEntity<
    TScreeps extends Named,
    TWrapper extends BaseWrapper<TScreeps>
  >(name: string, list: TWrapper[]): TWrapper | null {
    return list.find(wrapper => wrapper.instance.name === name) ?? null;
  }
}
