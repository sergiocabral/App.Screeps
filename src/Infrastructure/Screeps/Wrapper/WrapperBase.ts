import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { ToText } from '../../Helper/ToText';

/**
 * Creep
 */
export abstract class WrapperBase<TScreepsEntity> {
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
    return ToText.instance(this, []);
  };
}
