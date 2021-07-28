import { IGame } from '../../IGame';
import { EmptyError } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../../Core/IScreepsEnvironment';

/**
 * LJogo no funcionamento básico.
 */
export class BasicGame implements IGame {
  private screepEnvironmentValue: IScreepsEnvironment | null = null;

  /**
   * Objetos presentes no ambiente do Screeps
   * @private
   */
  private get screepEnvironment(): IScreepsEnvironment {
    if (this.screepEnvironmentValue === null) {
      throw new EmptyError('Value is not defined.');
    }
    return this.screepEnvironmentValue;
  }

  /**
   * Inicializa a classe.
   * @param screepEnvironment
   * @private
   */
  private initialize(screepEnvironment: IScreepsEnvironment) {
    this.screepEnvironmentValue = screepEnvironment;
  }

  /**
   * Implementada a lógica do loop do jogo.
   * @param screepEnvironment Objetos do Screeps.
   */
  public loop(screepEnvironment: IScreepsEnvironment): void {
    this.initialize(screepEnvironment);
  }
}
