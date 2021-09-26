import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { Energy } from './Energy/Energy';
import { IHasEnergy } from './Energy/IHasEnergy';
import { IEnergy } from './Energy/IEnergy';

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
  public energy: IEnergy = new Energy(
    () => this.instance.store.getCapacity(RESOURCE_ENERGY),
    () =>
      this.instance.store.getCapacity(RESOURCE_ENERGY) -
      this.instance.store[RESOURCE_ENERGY]
  );
}
