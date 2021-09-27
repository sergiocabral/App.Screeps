import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { EnergyInformation } from './Energy/EnergyInformation';
import { IHasEnergy } from './Energy/IHasEnergy';
import { IEnergyInformation } from './Energy/IEnergyInformation';

/**
 * Source
 */
export class SourceWrapper
  extends WrapperRolesAndPropertiesBase<Source>
  implements IHasEnergy
{
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    instance: Source,
    screepsEnvironment: IScreepsEnvironment
  ) {
    super(instance, screepsEnvironment, 'sources');
  }

  /**
   * Quantificação de energia.
   */
  public energy: IEnergyInformation = new EnergyInformation(
    () => this.instance.energyCapacity,
    () => this.instance.energyCapacity - this.instance.energy
  );
}
