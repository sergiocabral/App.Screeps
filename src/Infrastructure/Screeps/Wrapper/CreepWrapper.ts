import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';

/**
 * Creep
 */
export class CreepWrapper extends WrapperRolesAndPropertiesBase<Creep> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(instance: Creep, screepsEnvironment: IScreepsEnvironment) {
    super(instance, screepsEnvironment, 'creeps');
  }

  /**
   * Percentual de energia disponível.
   */
  public get availableEnergy(): number {
    return (
      this.instance.store.getUsedCapacity() / this.instance.store.getCapacity()
    );
  }

  /**
   * Percentual de energia consumida.
   */
  public get consumedEnergy(): number {
    return (
      this.instance.store.getFreeCapacity() / this.instance.store.getCapacity()
    );
  }
}
