import { IGame } from '../../IGame';
import {
  EmptyError,
  Logger,
  LogLevel,
  NotImplementedError
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
    this.tryHarvestEnergy();
    this.tryTransferEnergyToSpawn();
  }

  private getSpawn(): StructureSpawn {
    const spawns = this.screepsEnvironment.query.getSpawns();
    const uniqueSpawn = spawns[0];

    if (spawns.length !== 1 || uniqueSpawn === undefined) {
      throw new NotImplementedError(
        'Expected only one spawn for now, but found {spawnCount}.'.querystring({
          spawnCount: spawns.length
        })
      );
    }

    return uniqueSpawn;
  }

  /**
   * Tenta criar um creep.
   * @private
   */
  private tryCreateCreep(): void {
    const harvestBodyPart = [WORK, CARRY, MOVE];
    const harvestBodyPartCost =
      this.screepsEnvironment.query.calculateCost(harvestBodyPart);

    const spawn = this.getSpawn();
    if (spawn.room.energyAvailable < harvestBodyPartCost) return;

    const creepName = NameGenerator.firstAndLastName;
    spawn.spawnCreep([WORK, CARRY, MOVE], creepName);

    Logger.post('Creep created: {creepName}.', { creepName }, LogLevel.Debug);
  }

  private tryHarvestEnergy(): void {
    const spawn = this.getSpawn();

    const source = spawn.room
      .find(FIND_SOURCES)
      .find(source => source.energyCapacity > 0);
    if (!source) return;

    const creeps = this.screepsEnvironment.query
      .getCreeps()
      .filter(
        creep =>
          creep.room.name === spawn.room.name &&
          creep.store.getFreeCapacity() > 0
      );

    for (const creep of creeps) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }

  private tryTransferEnergyToSpawn(): void {
    const spawn = this.getSpawn();

    const source = spawn.room
      .find(FIND_SOURCES)
      .find(source => source.energyCapacity > 0);
    if (!source) return;

    const creeps = this.screepsEnvironment.query
      .getCreeps()
      .filter(
        creep =>
          creep.room.name === spawn.room.name &&
          creep.store.getFreeCapacity() === 0
      );

    for (const creep of creeps) {
      if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
  }
}
