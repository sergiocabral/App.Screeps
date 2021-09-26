import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { Energy } from './Energy/Energy';
import { IHasEnergy } from './Energy/IHasEnergy';
import { IEnergy } from './Energy/IEnergy';

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
  public energy: IEnergy = new Energy(
    () => this.instance.energyCapacity,
    () => this.instance.energyCapacity - this.instance.energy
  );
}
