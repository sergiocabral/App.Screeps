import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { IEnergyInformation } from './Energy/IEnergyInformation';
import { EnergyInformation } from './Energy/EnergyInformation';

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
   * Quantificação de energia.
   */
  public energy: IEnergyInformation = new EnergyInformation(
    () => this.instance.store.getCapacity(RESOURCE_ENERGY),
    () =>
      this.instance.store.getCapacity(RESOURCE_ENERGY) -
      this.instance.store[RESOURCE_ENERGY]
  );
}
