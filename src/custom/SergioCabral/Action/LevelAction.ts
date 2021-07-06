import { GameState } from "../GameState/GameState";
import { IScreepsLoop } from "../../Screeps/ILoop";
import { LogLevel } from "../../Common/Log/LogLevel";
import { Logger } from "../../Common/Log/Logger";

/**
 * Classe base para ações de nível.
 */
export abstract class LevelAction implements IScreepsLoop {
  /**
   * Gerenciamento do estado do jogo em memória
   * @protected
   */
  protected get state(): GameState {
    return GameState.default;
  }

  /**
   * Classe principal do jogo.
   * @protected
   */
  protected get game(): Game {
    return Game;
  }

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    Logger.post(
      "Level {level}. Action: {action}. Step: {levelStep}",
      { level: this.state.level, action: this.constructor.name, levelStep: this.state.levelStep },
      LogLevel.Verbose
    );
  }
}
