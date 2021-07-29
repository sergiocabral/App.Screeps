import { IGame } from '../../IGame';
import {
  EmptyError,
  Logger,
  LogLevel,
  NotImplementedError,
  ShouldNeverHappenError
} from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../../Core/IScreepsEnvironment';
import { NameGenerator } from '@sergiocabral/screeps';

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
    this.tryCreateCreep();
  }

  /**
   * Tenta criar um creep.
   * @private
   */
  private tryCreateCreep(): void {
    const spawns = this.screepsEnvironment.query.getSpawns();
    const spawnsNames = Object.keys(spawns);

    if (spawnsNames.length !== 1) {
      throw new NotImplementedError(
        'Expected only one spawn for now, but found {spawnCount}.'.querystring({
          spawnCount: spawnsNames.length
        })
      );
    }

    const spawnName = spawnsNames[0];
    if (spawnName === undefined) throw new ShouldNeverHappenError();

    const spawn = spawns[spawnName];
    if (spawn === undefined) throw new ShouldNeverHappenError();

    const harvestBodyPart = [WORK, CARRY, MOVE];
    const harvestBodyPartCost =
      this.screepsEnvironment.query.calculateCost(harvestBodyPart);

    if (spawn.room.energyAvailable < harvestBodyPartCost) return;

    const creepName = NameGenerator.firstName;
    spawn.spawnCreep([WORK, CARRY, MOVE], creepName);

    Logger.post('Creep created: {creepName}.', { creepName }, LogLevel.Debug);
  }
}
