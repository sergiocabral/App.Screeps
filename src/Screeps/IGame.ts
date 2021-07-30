import { IScreepsOperation } from '../Core/IScreepsOperation';

/**
 * Representa um classe que opera o jogo.
 */
export interface IGame {
  /**
   * Implementada a lógica do loop do jogo.
   * @param screepEnvironment Objetos do Screeps.
   */
  loop(screepEnvironment: IScreepsOperation): void;
}
