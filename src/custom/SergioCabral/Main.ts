import { ConsoleLogger } from "../Common/Log/ConsoleLogger";
import { GameState } from "./GameState/GameState";
import { IScreepsLoop } from "custom/ILoop";
import { LevelActionFactory } from "./Action/LevelActionFactory";
import { LogLevel } from "../Common/Log/LogLevel";
import { Logger } from "../Common/Log/Logger";

/**
 * Classe principal para `sergiocabral`
 */
export class Main implements IScreepsLoop {
  /**
   * Construtor.
   */
  public constructor() {
    Logger.minimumLevel = ConsoleLogger.minimumLevel = LogLevel.Debug;
    Logger.post("Constructor. Tick {gameTick}", { gameTick: Game.time }, LogLevel.Verbose);
  }

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    GameState.default = new GameState(Memory as any);
    GameState.default.tick++;

    Logger.post(
      "Loop. Global Tick {globalTick}. My Tick {myTick}.",
      { globalTick: Game.time, myTick: GameState.default.tick },
      LogLevel.Verbose
    );

    const action = LevelActionFactory.get(GameState.default.level);
    action.loop();

    GameState.default.save();
  }
}
