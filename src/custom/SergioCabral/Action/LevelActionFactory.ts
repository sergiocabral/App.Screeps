import { GameError } from "../../Common/Error/GameError";
import { GameLevel } from "../GameState/GameLevel";
import { GameUiAndBasicScripting } from "./Level/Tutorial/GameUiAndBasicScripting";
import { Json } from "../../Common/Helper/Type/Json";
import { LevelAction } from "./LevelAction";
import { LogLevel } from "../../Common/Log/LogLevel";
import { Logger } from "../../Common/Log/Logger";
import { UpgradingController } from "./Level/Tutorial/UpgradingController";

/**
 * Determina a ação do jogo com base no nível.
 */
export abstract class LevelActionFactory {
  /**
   * Retorna a instância de ação para o nível do jogo.
   * @param level Nível
   */
  public static get(level: GameLevel): LevelAction {
    let action: LevelAction;
    switch (level) {
      case GameLevel.Started:
        action = this.getTutorial() || new LevelAction();
        break;
      default:
        throw new GameError("Invalid level");
    }
    Logger.post("No action was selected for level {level}", { level: GameLevel[level] }, LogLevel.Verbose);
    return action;
  }

  /**
   * Retorna a action para um tutorial.
   * @private
   */
  private static getTutorial(): LevelAction | null {
    let action: LevelAction | null = null;
    const tutorialMemoryKey = "tutorial";
    const tutorialMemoryValue = (Memory as any as Json)[tutorialMemoryKey];
    const tutorialMemoryNumber = Number(tutorialMemoryValue);
    switch (Math.abs(tutorialMemoryNumber)) {
      case 1:
        action = new GameUiAndBasicScripting();
        break;
      case 2:
        action = new UpgradingController();
        break;
      default:
        if (tutorialMemoryValue === undefined) {
          Logger.post(
            "Set tutorial number in `Memory.{tutorialMemoryKey}` variable.",
            { tutorialMemoryKey },
            LogLevel.Information
          );
        } else if (tutorialMemoryValue) {
          Logger.post(
            "The current value for tutorial is invalid: {tutorialMemoryValue}",
            { tutorialMemoryValue },
            LogLevel.Warning
          );
        }
        (Memory as any as Json)[tutorialMemoryKey] = false;
    }
    if (action && tutorialMemoryNumber >= 0) {
      Logger.post(
        "Tutorial selected is: {tutorialSelected}",
        { tutorialSelected: action.constructor.name },
        LogLevel.Information
      );
      (Memory as any as Json)[tutorialMemoryKey] = -tutorialMemoryNumber;
    }
    return action;
  }
}
