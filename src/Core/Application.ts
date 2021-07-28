import { Configure } from './Configure';
import { InvalidExecutionError } from '@sergiocabral/helper';
import { GameMode } from '../Screeps/GameMode';
import { FactoryGame } from '../Screeps/FactoryGame';
import { IGame } from '../Screeps/IGame';
import { IScreepsEnvironment } from './IScreepsEnvironment';
import { Query } from "../Screeps/Query";

/**
 * Classe principal da aplicação.
 */
export class Application implements IScreepsEnvironment {
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
  constructor(gameMode: GameMode) {
    Configure.log();
    this.gameModeLogic = FactoryGame.create(gameMode);
    this.query = new Query(this.game);
  }

  /**
   * Lógica de funcionamento o jogo.
   * @private
   */
  private gameModeLogic: IGame;

  /**
   * Executa a aplicação.
   */
  public run(): void {
    this.gameModeLogic.loop(this);
  }

  /**
   * Classe principal de operação do Screeps.
   */
  public get game(): Game {
    return Game;
  }

  /**
   * Consulta informações do jogo.
   */
  readonly query: Query;
}
