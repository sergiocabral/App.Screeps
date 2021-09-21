import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { ControlCreep } from './ControlCreep';
import { ControlFlag } from './ControlFlag';
import { ToText } from '../../../Helper/ToText';

/**
 * Controladores de entidades do jogo.
 */
export class Controls {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(screepsEnvironment: IScreepsEnvironment) {
    this.creep = new ControlCreep(screepsEnvironment);
    this.flag = new ControlFlag(screepsEnvironment);
  }

  /**
   * Creeps.
   */
  public readonly creep: ControlCreep;

  /**
   * Flag
   */
  public readonly flag: ControlFlag;

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
