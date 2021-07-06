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

    const stepLevel = state.levelStep;
    const runStep = stepLevel % 2 !== 0;
    const stepOder = Math.floor(stepLevel / 2) + 1;
    const stepIndex = stepOder - 1;
    const hasSteps = stepIndex < this.steps.length;

    if (runStep) {
      if (hasSteps) {
        if (this.steps[stepIndex]()) state.levelStep++;

        if (state.levelStep !== stepLevel) {
          Logger.post("Change step from {stepFrom} to {stepTo}.", { stepFrom: stepOder, stepTo: stepOder + 1 });
        }
      }
    } else {
      const notifyUser = (Memory as any as Json).run === undefined;
      const userAcceptedRun = (Memory as any as Json).run;
      const waitForUserAction = () => ((Memory as any as Json).run = false);
      const resetUserAction = () => delete (Memory as any as Json).run;
      const goToTheNextStep = () => ++state.levelStep && resetUserAction();

      if (hasSteps) {
        if (notifyUser) {
          Logger.post("Type `Memory.run = true` to run the step {step}.", { step: stepOder }, LogLevel.Information);
          waitForUserAction();
        } else if (userAcceptedRun) {
          Logger.post("Running step {step}.", { step: stepOder }, LogLevel.Information);
          goToTheNextStep();
        }
      } else {
        Logger.post("There are no more steps.", undefined, LogLevel.Information);
        goToTheNextStep();
      }
    }
  }

  /**
   * Etapas de execução.
   * @protected
   */
  protected abstract steps: (() => boolean)[];
}
