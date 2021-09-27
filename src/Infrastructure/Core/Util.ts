import { Constant } from '@sergiocabral/screeps';
import { ToText } from '../Helper/ToText';
import { ControllerData } from '@sergiocabral/screeps/js/Database/ControllerData';
import { ControllerLevel } from '@sergiocabral/screeps/js/Type/ControllerLevel';

/**
 * Disponibilização de utilitários me geral.
 */
export class Util {
  /**
   * Formata a exibição de constantes.
   * @param constant
   */
  public constant(constant: unknown): string {
    return Constant.format(constant);
  }

  /**
   * Informações sobre os níveis para controller.
   */
  public get levels(): ControllerLevel[] {
    return ControllerData.levels;
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this, []);
  };
}
