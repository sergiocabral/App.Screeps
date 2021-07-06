import { Json } from "../../../../Common/Helper/Type/Json";
import { LevelAction } from "../../LevelAction";
import { LogLevel } from "../../../../Common/Log/LogLevel";
import { Logger } from "../../../../Common/Log/Logger";

/**
 * Ação do tutorial
 */
export abstract class Tutorial extends LevelAction {
  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    super.loop();

    const state = this.state;

    const currentLevelStep = state.levelStep;
    const oddStep = state.levelStep % 2 !== 0;
    const humanStepNumber = Math.floor(currentLevelStep / 2) + 1;
    if (oddStep) {
      if (this.runStep(humanStepNumber)) state.levelStep++;

      if (state.levelStep !== currentLevelStep) {
        Logger.post(
          "Change step from {stepFrom} to {stepTo}.",
          { stepFrom: humanStepNumber, stepTo: humanStepNumber + 1 },
          LogLevel.Information
        );
      }
    } else {
      if ((Memory as any as Json).run === undefined) {
        Logger.post(
          "Type `Memory.run = true` to run the current step {step}.",
          { step: humanStepNumber },
          LogLevel.Information
        );
        (Memory as any as Json).run = false;
      } else if ((Memory as any as Json).run) {
        Logger.post("Running current step {step}.", { step: humanStepNumber }, LogLevel.Information);
        delete (Memory as any as Json).run;
        state.levelStep++;
      }
    }
  }

  /**
   * Execução dos passos do tutorial. Retorna true quando conclui o passo.
   * @param step Número do passo.
   * @protected
   */
  protected abstract runStep(step: number): boolean;
}
