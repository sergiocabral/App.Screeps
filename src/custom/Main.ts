import "./Common/Helper/Prototype/String";
import { Main as CustomMain } from "./SergioCabral/Main";
import { IScreepsLoop } from "./Screeps/ILoop";

/**
 * Classe principal
 */
export abstract class Main {
  /**
   * Instância principal (valor)
   */
  private static instanceValue: IScreepsLoop | null = null;

  /**
   * Instância principal.
   */
  public static get instance(): IScreepsLoop {
    return this.instanceValue || (this.instanceValue = new CustomMain());
  }
}
