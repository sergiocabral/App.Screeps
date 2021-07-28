import { IGame } from '../../IGame';
import {
  EmptyError,
  NotImplementedError,
  ShouldNeverHappenError
} from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../../Core/IScreepsEnvironment';

/**
 * LJogo no funcionamento básico.
 */
export class BasicGame implements IGame {
  private screepsEnvironmentValue: IScreepsEnvironment | null = null;

  /**
   * Objetos presentes no ambiente do Screeps
   * @private
   */
  private get screepsEnvironment(): IScreepsEnvironment {
    if (this.screepsEnvironmentValue === null) {
      throw new EmptyError('Value is not defined.');
    }
    return this.screepsEnvironmentValue;
  }

  /**
   * Inicializa a classe.
   * @param screepEnvironment
   * @private
   */
  private initialize(screepEnvironment: IScreepsEnvironment) {
    this.screepsEnvironmentValue = screepEnvironment;
  }

  /**
   * Implementada a lógica do loop do jogo.
   * @param screepsEnvironment Propriedades que lidam diretamente com o ambiente do Screeps.
   */
  public loop(screepsEnvironment: IScreepsEnvironment): void {
    this.initialize(screepsEnvironment);
    this.do();
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  private do(): void {
    //TODO: Extrair para função específica.

    const spawns = this.screepsEnvironment.query.getSpawns();
    const spawnsNames = Object.keys(spawns);

    if (spawnsNames.length !== 1) {
      throw new NotImplementedError(
        'Expected only one spawn for now, but found {spawnCount}.'.querystring({
          spawnCount: spawnsNames.length
        })
      );
    }

    const uniqueSpawnsName = spawnsNames[0];
    if (uniqueSpawnsName === undefined) throw new ShouldNeverHappenError();

    const uniqueSpawn = spawns[uniqueSpawnsName];
    if (uniqueSpawn === undefined) throw new ShouldNeverHappenError();

    uniqueSpawn.spawnCreep([WORK, CARRY, MOVE], 'Ops!');
  }
}
