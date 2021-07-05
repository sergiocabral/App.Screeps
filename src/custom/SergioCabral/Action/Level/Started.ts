import { GameState } from "../../GameState/GameState";
import { LevelAction } from "../LevelAction";
import { Logger } from "../../../Common/Log/Logger";

/**
 * Ação inicial do jogo.
 */
export class Started extends LevelAction {
  /**
   * Nome do spawn Spawn1
   * @private
   */
  private nameOfSpawn1 = "Spawn1";

  /**
   * Nome do creep Harvester1
   * @private
   */
  private nameOfHarvester1 = "Harvester1";

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    super.loop();

    switch (GameState.default.levelStep) {
      case 0:
        if (this.createCreep()) this.state.levelStep++;
        break;

      case 1:
        if (this.sendCreepToHarvest()) this.state.levelStep++;
        break;

      default:
        if (this.sendCreepToHarvestAndTransferToTheSpawn()) this.state.levelStep++;
        break;
    }
  }

  private createCreep(): boolean {
    const game = this.game;
    game.spawns[this.nameOfSpawn1].spawnCreep([WORK, CARRY, MOVE], this.nameOfHarvester1);
    return true;
  }

  private sendCreepToHarvest(): boolean {
    const game = this.game;
    const creep = game.creeps[this.nameOfHarvester1];
    const sources = creep.room.find(FIND_SOURCES);
    const harvested = creep.harvest(sources[0]) !== ERR_NOT_IN_RANGE;
    if (!harvested) creep.moveTo(sources[0]);
    return harvested;
  }

  private sendCreepToHarvestAndTransferToTheSpawn(): boolean {
    const game = this.game;
    const creep = game.creeps[this.nameOfHarvester1];

    const creepFreeCapacity = creep.store.getFreeCapacity();
    Logger.post("Creep {name}. FreeCapacity: {freeCapacity}.", { name: creep.name, freeCapacity: creepFreeCapacity });
    if (creepFreeCapacity > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      const harvested = creep.harvest(sources[0]) !== ERR_NOT_IN_RANGE;
      if (!harvested) creep.moveTo(sources[0]);
      return harvested;
    } else {
      const transferred = creep.transfer(Game.spawns[this.nameOfSpawn1], RESOURCE_ENERGY) !== ERR_NOT_IN_RANGE;
      if (!transferred) creep.moveTo(Game.spawns[this.nameOfSpawn1]);
      return transferred;
    }
  }
}
