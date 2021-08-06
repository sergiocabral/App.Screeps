import { IScreepsOperation } from '../Screeps/IScreepsOperation';

/**
 * Representa um classe que opera o jogo.
 */
export interface IGame {
  /**
   * Implementada a lógica do loop do jogo.
   * @param screepsEnvironment Objetos do Screeps.
   */
  loop(screepsEnvironment: IScreepsOperation): void;
}
