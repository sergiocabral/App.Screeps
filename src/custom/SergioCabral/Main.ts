import { ConsoleLogger } from "../Common/Log/ConsoleLogger";
import { GameState } from "./GameState/GameState";
import { IScreepsLoop } from "custom/Screeps/ILoop";
import { LevelActionFactory } from "./Action/LevelActionFactory";
import { LogLevel } from "../Common/Log/LogLevel";
import { Logger } from "../Common/Log/Logger";

/**
 * Classe principal para `sergiocabral`
 */
export class Main implements IScreepsLoop {
  /**
   * Sinaliza que já em execução.
   * @private
   */
  private alreadyRunning = false;

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    const state = (GameState.default = new GameState(Memory as any));

    Logger.minimumLevel = ConsoleLogger.minimumLevel = state.logLevel;

    state.tick++;

    Logger.post(
      "Loop. Global Tick {globalTick}. My Tick {myTick}. Instance re/created: {created}",
      { globalTick: Game.time, myTick: state.tick, created: !this.alreadyRunning },
      LogLevel.Verbose
    );

    this.alreadyRunning = true;

    const action = LevelActionFactory.get(state.level);
    action.loop();

    state.save();
  }
}
