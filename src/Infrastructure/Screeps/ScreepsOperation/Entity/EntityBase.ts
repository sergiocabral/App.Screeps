import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { ToText } from '../../../Helper/ToText';

/**
 * Base para entidades do jogo
 */
export abstract class EntityBase {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(protected screepsEnvironment: IScreepsEnvironment) {}

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
