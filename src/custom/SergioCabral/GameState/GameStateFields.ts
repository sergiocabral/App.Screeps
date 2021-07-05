import { GameLevel } from "./GameLevel";

/**
 * Campos do jogo para serem armazenados no estado do jogo.
 */
export interface GameStateFields {
  /**
   * Tick do meu jogo.
   */
  tick: number;

  /**
   * Nível do jogo.
   */
  level: GameLevel;

  /**
   * Etapa do nível.
   */
  levelStep: number;
}
