import { CreepWrapper } from '../../Infrastructure/Screeps/Entity/CreepWrapper';
import { CreepRole } from '../Definition/CreepRole';

/**
 * Creep coletor de energia.
 */
export class CreepHarvest extends CreepWrapper {
  /**
   * Chamada durante a construção.
   * @protected
   */
  protected override onInitialize(): void {
    super.onInitialize();
    this.roles.add(CreepRole.Harvest);
  }
}
