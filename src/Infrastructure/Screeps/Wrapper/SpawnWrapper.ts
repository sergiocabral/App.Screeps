import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';

/**
 * Spawn
 */
export class SpawnWrapper extends WrapperRolesAndPropertiesBase<StructureSpawn> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    instance: StructureSpawn,
    screepsEnvironment: IScreepsEnvironment
  ) {
    super(instance, screepsEnvironment, 'spawn');
  }

  /**
   * Percentual de energia disponível.
   */
  public get availableEnergy(): number {
    const usedCapacity = this.instance.store.getUsedCapacity(RESOURCE_ENERGY);
    const capacity = this.instance.store.getCapacity(RESOURCE_ENERGY);
    return usedCapacity / capacity;
  }

  /**
   * Percentual de energia consumida.
   */
  public get consumedEnergy(): number {
    const freeCapacity = this.instance.store.getFreeCapacity(RESOURCE_ENERGY);
    const capacity = this.instance.store.getCapacity(RESOURCE_ENERGY);
    return freeCapacity / capacity;
  }
}
