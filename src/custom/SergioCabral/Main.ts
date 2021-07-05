import { IScreepsLoop } from "custom/ILoop";
import { Memory } from "../../../test/unit/mock";
import { Logger } from "../Common/Log/Logger";
import { LogLevel } from "../Common/Log/LogLevel";
import { GameState } from "./GameState/GameState";
import { NameGenerator } from "./NameGenerator";

/**
 * Classe principal para `sergiocabral`
 */
export class Main implements IScreepsLoop {
  /**
   * Construtor.
   */
  public constructor() {
    this.gameState = new GameState(Memory);
    Logger.post("Constructor. Tick {gameTick}", { gameTick: Game.time }, LogLevel.Verbose);
  }

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    Logger.post(
      "Loop. Tick {gameTick}. Name: {name}",
      { gameTick: Game.time, name: NameGenerator.spawn },
      LogLevel.Verbose
    );
  }

  /**
   * Estado do jogo.
   * @private
   */
  private gameState: GameState;
}
