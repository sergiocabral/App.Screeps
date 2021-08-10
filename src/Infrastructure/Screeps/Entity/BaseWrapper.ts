import { IScreepsEnvironment } from '../IScreepsEnvironment';

/**
 * Creep
 */
export abstract class BaseWrapper<TScreepsEntity> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    public instance: TScreepsEntity,
    protected readonly screepsEnvironment: IScreepsEnvironment
  ) {}
}
