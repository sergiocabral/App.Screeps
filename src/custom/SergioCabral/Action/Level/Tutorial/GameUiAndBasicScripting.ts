import { Constants } from "../../../../Screeps/Constants";
import { LogLevel } from "../../../../Common/Log/LogLevel";
import { Logger } from "../../../../Common/Log/Logger";
import { Tutorial } from "./Tutorial";

/**
 * Tutorial: Game UI and basic scripting.
 */
export class GameUiAndBasicScripting extends Tutorial {
  /**
   * Etapas de execução.
   * @protected
   */
  protected steps: (() => boolean)[] = [
    (): boolean => this.createCreep(this.nameOfHarvester1, this.nameOfSpawn1),
    (): boolean => this.sendCreepToHarvest(this.nameOfHarvester1),
    (): boolean => this.sendCreepToHarvestAndTransferToTheSpawn(this.nameOfHarvester1, this.nameOfSpawn1),
    (): boolean => this.createCreep(this.nameOfHarvester2, this.nameOfSpawn1),
    (): boolean =>
      this.sendCreepsToHarvestAndTransferToTheSpawn([this.nameOfHarvester1, this.nameOfHarvester2], this.nameOfSpawn1)
  ];

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
   * Nome do creep Harvester2
   * @private
   */
  private nameOfHarvester2 = "Harvester2";

  /**
   * Cria um Screep
   * @param creepName
   * @param spawnName
   * @private
   */
  private createCreep(creepName: string, spawnName: string): boolean {
    const game = this.game;
    const code = game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], creepName);
    const created = code === OK;
    Logger.post(
      "The spawn '{spawnName}' created the creep '{creepName}'. Code: {code}",
      { spawnName, creepName, code: Constants.format(code) },
      LogLevel.Information
    );
    return created;
  }

  /**
   * Move o Screep para colher na fonte.
   * @param creepName
   * @private
   */
  private sendCreepToHarvest(creepName: string): boolean {
    const game = this.game;
    const creep = game.creeps[creepName];
    const sources = creep.room.find(FIND_SOURCES);
    const code = creep.harvest(sources[0]);
    const harvested = code === OK;
    if (harvested) {
      Logger.post(
        "Creep '{creepName}' harvested the energy. Code: {code}",
        { creepName, code: Constants.format(code) },
        LogLevel.Information
      );
    } else if (code === ERR_NOT_IN_RANGE) {
      Logger.post("Creep '{creepName}' did not harvest the energy. Walking to the source. Code: {code}", {
        creepName,
        code: Constants.format(code)
      });
      creep.moveTo(sources[0]);
    }
    return harvested;
  }

  /**
   * Faz o Screep colher na fonte e recarregar o Spawn
   * @param creepName
   * @param spawnName
   * @private
   */
  private sendCreepToHarvestAndTransferToTheSpawn(creepName: string, spawnName: string): boolean {
    const game = this.game;
    const creep = game.creeps[creepName];

    const creepFreeCapacity = creep.store.getFreeCapacity();
    if (creepFreeCapacity > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      const creepUsedCapacity = creep.store.getUsedCapacity();
      const code = creep.harvest(sources[0]);
      if (code === OK) {
        const creepFreeCapacityAfterWork = creep.store.getFreeCapacity();
        if (creepUsedCapacity === 0) {
          Logger.post(
            "Creep '{creepName}' started to harvest energy. FreeCapacity: {freeCapacity}. Code: {code}",
            {
              creepName,
              freeCapacity: creepFreeCapacityAfterWork,
              code: Constants.format(code)
            },
            LogLevel.Information
          );
        }
        Logger.post("Creep '{creepName}' harvested the energy. FreeCapacity: {freeCapacity}. Code: {code}", {
          creepName,
          freeCapacity: creepFreeCapacityAfterWork,
          code: Constants.format(code)
        });
      } else if (code === ERR_NOT_IN_RANGE) {
        Logger.post(
          "Creep '{creepName}' did not harvest the energy. Walking to the source. FreeCapacity: {freeCapacity}. Code: {code}",
          {
            creepName,
            freeCapacity: creepFreeCapacity,
            code: Constants.format(code)
          }
        );
        creep.moveTo(sources[0]);
      }
    } else {
      const code = creep.transfer(game.spawns[spawnName], RESOURCE_ENERGY);
      const isFull = code === ERR_FULL;
      if (code === OK) {
        Logger.post(
          "Creep '{creepName}' transferred the energy to spawn '{spawnName}'. FreeCapacity: {freeCapacity}. Code: {code}",
          { spawnName, creepName, freeCapacity: creepFreeCapacity, code: Constants.format(code) },
          LogLevel.Information
        );
      } else if (code === ERR_NOT_IN_RANGE) {
        Logger.post(
          "Creep '{creepName}' did not transfer the energy. Walking to the spawn '{spawnName}'. FreeCapacity: {freeCapacity}. Code: {code}",
          {
            spawnName,
            creepName,
            freeCapacity: creepFreeCapacity,
            code: Constants.format(code)
          }
        );
        creep.moveTo(game.spawns[this.nameOfSpawn1]);
      } else if (isFull) {
        Logger.post(
          "Creep '{creepName}' did not transfer the energy. Spawn '{spawnName}' is full. FreeCapacity: {freeCapacity}. Code: {code}",
          { spawnName, creepName, freeCapacity: creepFreeCapacity, code: Constants.format(code) },
          LogLevel.Information
        );
      }
      return isFull;
    }
    return false;
  }

  /**
   * Fica em loop recolhendo na fonte e carregando o Spawn até completar.
   * @param creepsNames
   * @param spawnName
   * @private
   */
  private sendCreepsToHarvestAndTransferToTheSpawn(creepsNames: string[], spawnName: string): boolean {
    let finished = false;
    for (const creepName of creepsNames) {
      finished = finished || this.sendCreepToHarvestAndTransferToTheSpawn(creepName, spawnName);
    }
    return finished;
  }
}
