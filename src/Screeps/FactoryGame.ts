import { GameMode } from './GameMode';
import { IGame } from './IGame';
import {
  InvalidExecutionError,
  NotImplementedError
} from '@sergiocabral/helper';
import { BasicGame } from './Modes/BasicGame/BasicGame';

/**
 * Responsável por criar uma lógica de jogo.
 */
export class FactoryGame {
  /**
   * Construtor.
   */
  private constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }

  /**
   * Cria uma lógica de jogo com base num tipo especificado.
   * @param gameMode
   * @returns Instância do jogo.
   */
  public static create(gameMode: GameMode): IGame {
    switch (gameMode) {
      case 'Basic':
        return new BasicGame();
      default:
        throw new NotImplementedError(
          'Unknown game mode {gameMode}'.querystring({ gameMode })
        );
    }
  }
}
