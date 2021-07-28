import { IGame } from '../../IGame';
import { Logger } from '@sergiocabral/helper';

/**
 * LJogo no funcionamento básico.
 */
export class BasicGame implements IGame {
  /**
   * Implementada a lógica do loop do jogo.
   */
  public loop(): void {
    Logger.post('Loop para BasicGame.');
  }
}
