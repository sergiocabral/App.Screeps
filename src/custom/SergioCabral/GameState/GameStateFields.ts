import { GameLevel } from "./GameLevel";

/**
 * Campos do jogo para serem armazenados no estado do jogo.
 */
export interface GameStateFields {
  /**
   * Nível do jogo.
   */
  level: GameLevel;
}
