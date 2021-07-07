import { Constants } from "../../../../Screeps/Constants";
import { LogLevel } from "../../../../Common/Log/LogLevel";
import { Logger } from "../../../../Common/Log/Logger";
import { Tutorial } from "./Tutorial";

/**
 * Tutorial: Upgrading Controller.
 */
export class UpgradingController extends Tutorial {
  /**
   * Etapas de execução.
   * @protected
   */
  protected steps: (() => boolean)[] = [
    (): boolean => this.createCreep(this.nameOfUpgrader1, this.nameOfSpawn1),
    (): boolean =>
      this.defineCreepsRoles([
        [this.nameOfHarvester1, this.nameOfHarvesterRole],
        [this.nameOfUpgrader1, this.nameOfUpgraderRole]
      ]),
    (): boolean => this.itIsNecessaryToProceedManually()
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
   * Nome da role para creep Upgrader
   * @private
   */
  private nameOfHarvesterRole = "harvester";

  /**
   * Nome do creep Upgrader1
   * @private
   */
  private nameOfUpgrader1 = "Upgrader1";

  /**
   * Nome da role para creep Upgrader
   * @private
   */
  private nameOfUpgraderRole = "upgrader";

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
   * Define as roles para os creeps.
   * @param creepAndRoles
   * @private
   */
  private defineCreepsRoles(creepAndRoles: string[][]): boolean {
    const game = this.game;
    for (const creepAndRole of creepAndRoles) {
      const creepName = creepAndRole[0];
      const roleName = creepAndRole[1];
      game.creeps[creepName].memory.role = roleName;
      Logger.post("Defined for creep '{creepName}' the role {roleName}", { creepName, roleName }, LogLevel.Information);
    }
    return true;
  }
}
