/**
 * Objetos presentes no ambiente do Screeps.
 */
export interface IScreepsEnvironment {
  /**
   * Classe principal de operação.
   */
  get game(): Game;
}
