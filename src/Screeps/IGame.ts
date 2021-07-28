import { IScreepsEnvironment } from '../Core/IScreepsEnvironment';

/**
 * Representa um classe que opera o jogo.
 */
export interface IGame {
  /**
   * Implementada a lógica do loop do jogo.
   * @param screepEnvironment Objetos do Screeps.
   */
  loop(screepEnvironment: IScreepsEnvironment): void;
}
