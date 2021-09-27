import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { IEnergy } from './Energy/IEnergy';
import { Energy } from './Energy/Energy';

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
  public energy: IEnergy = new Energy(
    () => this.instance.store.getCapacity(RESOURCE_ENERGY),
    () =>
      this.instance.store.getCapacity(RESOURCE_ENERGY) -
      this.instance.store[RESOURCE_ENERGY]
  );
}
