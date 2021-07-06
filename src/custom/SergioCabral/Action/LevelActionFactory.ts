import { GameError } from "../../Common/Error/GameError";
import { GameLevel } from "../GameState/GameLevel";
import { GameUiAndBasicScripting } from "./Level/Tutorial/GameUiAndBasicScripting";
import { LevelAction } from "./LevelAction";

/**
 * Determina a ação do jogo com base no nível.
 */
export abstract class LevelActionFactory {
  /**
   * Retorna a instância de ação para o nível do jogo.
   * @param level Nível
   */
  public static get(level: GameLevel): LevelAction {
    switch (level) {
      case GameLevel.Started:
        return new GameUiAndBasicScripting();
      default:
        throw new GameError("Invalid level");
    }
  }
}
