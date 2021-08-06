import { IScreepsOperation } from '../Screeps/IScreepsOperation';

/**
 * Representa uma classe que é executada pelo loop do jogo.
 */
export interface ILoop {
  /**
   * Executa a cada loop do jogo.
   * @param screepsEnvironment Objetos do Screeps.
   */
  loop(screepsEnvironment: IScreepsOperation): void;
}
