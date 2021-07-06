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
  protected steps: (() => boolean)[] = [(): boolean => this.createCreep(this.nameOfUpgrader1, this.nameOfSpawn1)];

  /**
   * Nome do spawn Spawn1
   * @private
   */
  private nameOfSpawn1 = "Spawn1";

  /**
   * Nome do creep Upgrader1
   * @private
   */
  private nameOfUpgrader1 = "Upgrader1";

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
}
