import { GameBase } from '../Infrastructure/Core/GameBase';
import { FactoryCreep } from './FactoryCreep';

/**
 * Classe base para os modos de operação.
 */
export abstract class ModeBase extends GameBase {
  /**
   * Construtor de creeps.
   * @private
   */
  private factoryCreepValue: FactoryCreep | undefined = undefined;

  /**
   * Construtor de creeps.
   * @protected
   */
  protected get factoryCreep(): FactoryCreep {
    if (this.factoryCreepValue === undefined) {
      this.factoryCreepValue = new FactoryCreep(this.screepsOperation);
    }
    return this.factoryCreepValue;
  }
}
