/**
 * Disponibiliza objetos do ambiente do Screeps.
 */
export interface IScreepsEnvironment {
  /**
   * Objeto principal do jogo.
   */
  readonly game: Game;

  /**
   * Objeto para armazenar estados entre os loops.
   */
  readonly memory: Memory;

  /**
   * Formas de encontrar caminhos pelo jogo.
   */
  readonly pathFinder: PathFinder;

  /**
   * Forma de implementar um stringify personalizado.
   */
  readonly rawMemory: RawMemory;
}
