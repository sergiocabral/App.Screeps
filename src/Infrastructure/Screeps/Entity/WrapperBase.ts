import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WithId } from '../../Type/WithId';

/**
 * Creep
 */
export abstract class WrapperBase<TScreepsEntity extends WithId> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  protected constructor(
    public instance: TScreepsEntity,
    protected readonly screepsEnvironment: IScreepsEnvironment
  ) {}

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return String(this.instance);
  };
}
