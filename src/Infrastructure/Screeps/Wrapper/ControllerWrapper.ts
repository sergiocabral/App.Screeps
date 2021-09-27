import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';
import { Energy } from './Energy/Energy';
import { IHasEnergy } from './Energy/IHasEnergy';
import { IEnergy } from './Energy/IEnergy';
import { ControllerData } from '@sergiocabral/screeps/js/Database/ControllerData';
import { InvalidDataError } from '@sergiocabral/helper';
import { ControllerLevel } from '@sergiocabral/screeps/js/Type/ControllerLevel';

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
   * Informações do nível 7.
   * @private
   */
  private static get level7(): ControllerLevel {
    const level7index = 6;
    const level = ControllerData.levels[level7index];
    if (level === undefined) {
      throw new InvalidDataError('Cannot read data of controller level 7');
    }
    return level;
  }

  /**
   * Quantificação de energia.
   */
  public energy: IEnergy = new Energy(
    ControllerWrapper.level7.progressTotal,
    () => ControllerWrapper.level7.progressTotal - this.instance.progress
  );
}
