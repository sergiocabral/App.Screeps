import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { EnergyInformation } from './Energy/EnergyInformation';
import { IHasEnergy } from './Energy/IHasEnergy';
import { IEnergyInformation } from './Energy/IEnergyInformation';

/**
 * Spawn
 */
export class SpawnWrapper
  extends WrapperRolesAndPropertiesBase<StructureSpawn>
  implements IHasEnergy
{
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
   * Quantificação de energia.
   */
  public energy: IEnergyInformation = new EnergyInformation(
    () => this.instance.store.getCapacity(RESOURCE_ENERGY),
    () =>
      this.instance.store.getCapacity(RESOURCE_ENERGY) -
      this.instance.store[RESOURCE_ENERGY]
  );
}
