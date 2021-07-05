import { IScreepsLoop } from "custom/ILoop";
import { Logger } from "../Common/Log/Logger";

/**
 * Classe principal para `sergiocabral`
 */
export class Main implements IScreepsLoop {
  /**
   * Construtor.
   */
  public constructor() {
    Logger.post("Constructor. Tick {gameTick}", { gameTick: Game.time });
  }

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    Logger.post("Loop. Tick {gameTick}", { gameTick: Game.time });
  }
}
