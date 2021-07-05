import { IScreepsLoop } from "custom/ILoop";

/**
 * Classe principal para `sergiocabral`
 */
export class Main implements IScreepsLoop {
  /**
   * Construtor.
   */
  public constructor() {
    console.log(`Constructor. Tick ${Game.time}`);
  }

  /**
   * Método de loop chamado pelo Screeps.
   */
  public loop(): void {
    console.log(`Loop. Tick ${Game.time}`);
  }
}
