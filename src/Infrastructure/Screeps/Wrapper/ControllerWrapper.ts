import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { Energy } from './Energy/Energy';
import { IHasEnergy } from './Energy/IHasEnergy';
import { IEnergy } from './Energy/IEnergy';

/**
 * Controller
 */
export class ControllerWrapper
  extends WrapperRolesAndPropertiesBase<StructureController>
  implements IHasEnergy
{
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    instance: StructureController,
    screepsEnvironment: IScreepsEnvironment
  ) {
    super(instance, screepsEnvironment, 'controller');
  }

  /**
   * Quantificação de energia.
   */
  public energy: IEnergy = new Energy(
    () => 0,
    () => 0
  );
}
