import { Configure } from './Configure';
import { InvalidExecutionError } from '@sergiocabral/helper';
import { IGame } from './IGame';
import { IScreepsOperation } from '../Screeps/IScreepsOperation';
import { Query } from '../Screeps/Query';
import { IScreepsEnvironment } from '../Screeps/IScreepsEnvironment';

/**
 * Classe principal da aplicação.
 */
export class Application implements IScreepsOperation, IScreepsEnvironment {
  /**
   * Única instância desta classe.
   * Padrão de projeto Singleton.
   * @private
   */
  private static uniqueInstance: Application | null = null;

  /**
   * Inicia a aplicação.
   * @param gameExecutor Modo operacional do jogo.
   */
  public static start(gameExecutor: IGame): void {
    if (this.uniqueInstance !== null) {
      throw new InvalidExecutionError(
        'This class can only be instantiated once.'
      );
    }
    this.uniqueInstance = new Application(gameExecutor);
    this.uniqueInstance.run();
  }

  /**
   * Construtor.
   * @param gameExecutor Modo operacional do jogo.
   */
  private constructor(private gameExecutor: IGame) {
    Configure.log();

    this.query = new Query(this);
  }

  /**
   * Executa a aplicação.
   */
  public run(): void {
    this.gameExecutor.loop(this);
  }

  /**
   * Objeto principal do jogo.
   */
  public readonly game: Game = Game;

  /**
   * Objeto para armazenar estados entre os loops.
   */
  public readonly memory: Memory = Memory;

  /**
   * Formas de encontrar caminhos pelo jogo.
   */
  public readonly pathFinder: PathFinder = PathFinder;

  /**
   * Forma de implementar um stringify personalizado.
   */
  public readonly rawMemory: RawMemory = RawMemory;

  /**
   * Consulta informações do jogo.
   */
  readonly query: Query;
}
