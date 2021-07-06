import { GameLevel } from "./GameLevel";
import { LogLevel } from "../../Common/Log/LogLevel";

/**
 * Campos do jogo para serem armazenados no estado do jogo.
 */
export interface GameStateFields {
  /**
   * Nível de exibição de log.
   */
  logLevel: LogLevel;

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
