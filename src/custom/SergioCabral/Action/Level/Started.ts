import { Constants } from "../../../Screeps/Constants";
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

    const state = this.state;
    const currentLevelStep = state.levelStep;

    switch (GameState.default.levelStep) {
      case 0:
        if (this.createCreep()) state.levelStep++;
        break;

      case 1:
        if (this.sendCreepToHarvest()) state.levelStep++;
        break;

      default:
        if (this.sendCreepToHarvestAndTransferToTheSpawn()) state.levelStep++;
        break;
    }

    if (state.levelStep !== currentLevelStep) {
      Logger.post("Change step from {stepFrom} to {stepTo}.", { stepTo: state.levelStep, stepFrom: currentLevelStep });
    }
  }

  private createCreep(): boolean {
    const game = this.game;
    const code = game.spawns[this.nameOfSpawn1].spawnCreep([WORK, CARRY, MOVE], this.nameOfHarvester1);
    Logger.post("Create creep {creepName}. Code: {code}", {
      creepName: this.nameOfHarvester1,
      code: Constants.format(code)
    });
    return true;
  }

  private sendCreepToHarvest(): boolean {
    const game = this.game;
    const creep = game.creeps[this.nameOfHarvester1];
    const sources = creep.room.find(FIND_SOURCES);
    const code = creep.harvest(sources[0]);
    const harvested = code !== ERR_NOT_IN_RANGE;
    if (harvested) {
      Logger.post("Creep {creepName} harvested the energy. Code: {code}", {
        creepName: this.nameOfHarvester1,
        code: Constants.format(code)
      });
    } else {
      Logger.post("Creep {creepName} did not harvest the energy. Walking to the source. Code: {code}", {
        creepName: this.nameOfHarvester1,
        code: Constants.format(code)
      });
      creep.moveTo(sources[0]);
    }
    return harvested;
  }

  private sendCreepToHarvestAndTransferToTheSpawn(): boolean {
    const game = this.game;
    const creep = game.creeps[this.nameOfHarvester1];

    const creepFreeCapacity = creep.store.getFreeCapacity();
    if (creepFreeCapacity > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      const code = creep.harvest(sources[0]);
      const harvested = code !== ERR_NOT_IN_RANGE;
      if (harvested) {
        Logger.post("Creep {creepName} harvested the energy. FreeCapacity: {freeCapacity}. Code: {code}", {
          creepName: this.nameOfHarvester1,
          freeCapacity: creepFreeCapacity,
          code: Constants.format(code)
        });
      } else {
        Logger.post(
          "Creep {creepName} did not harvest the energy. Walking to the source. FreeCapacity: {freeCapacity}. Code: {code}",
          {
            creepName: this.nameOfHarvester1,
            freeCapacity: creepFreeCapacity,
            code: Constants.format(code)
          }
        );
        creep.moveTo(sources[0]);
      }
      return harvested;
    } else {
      const code = creep.transfer(Game.spawns[this.nameOfSpawn1], RESOURCE_ENERGY);
      const transferred = code !== ERR_NOT_IN_RANGE;
      if (transferred) {
        Logger.post("Creep {creepName} transferred the energy. FreeCapacity: {freeCapacity}. Code: {code}", {
          creepName: this.nameOfHarvester1,
          freeCapacity: creepFreeCapacity,
          code: Constants.format(code)
        });
      } else {
        Logger.post(
          "Creep {creepName} did not transfer the energy. Walking to the spawn {spawnName}. FreeCapacity: {freeCapacity}. Code: {code}",
          {
            spawnName: this.nameOfSpawn1,
            creepName: this.nameOfHarvester1,
            freeCapacity: creepFreeCapacity,
            code: Constants.format(code)
          }
        );
        creep.moveTo(Game.spawns[this.nameOfSpawn1]);
      }
      return transferred;
    }
  }
}
