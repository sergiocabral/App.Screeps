import { Configure } from './Configure';
import { InvalidExecutionError } from '@sergiocabral/helper';
import { GameMode } from '../Screeps/GameMode';
import { FactoryGame } from '../Screeps/FactoryGame';
import { IGame } from '../Screeps/IGame';
import { IScreepsOperation } from './IScreepsOperation';
import { Query } from '../Screeps/Query';
import { IScreepsEnvironment } from './IScreepsEnvironment';

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
   * @param gameMode Modo operacional do jogo.
   */
  public static start(gameMode: GameMode): void {
    if (this.uniqueInstance !== null) {
      throw new InvalidExecutionError(
        'This class can only be instantiated once.'
      );
    }
    this.uniqueInstance = new Application(gameMode);
    this.uniqueInstance.run();
  }

  /**
   * Construtor.
   * @param gameMode Modo operacional do jogo.
   */
  private constructor(gameMode: GameMode) {
    Configure.log();

    this.gameExecutor = FactoryGame.create(gameMode);

    this.query = new Query(this);
  }

  /**
   * Lógica de funcionamento o jogo.
   * @private
   */
  private gameExecutor: IGame;

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
