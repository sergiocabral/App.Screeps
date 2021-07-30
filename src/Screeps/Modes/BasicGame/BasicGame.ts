import { IGame } from '../../IGame';
import {
  EmptyError,
  KeyValue,
  Logger,
  LogLevel,
  NotImplementedError
} from '@sergiocabral/helper';
import { IScreepsOperation } from '../../../Core/IScreepsOperation';
import { NameGenerator } from '@sergiocabral/screeps';

/**
 * Jogo no funcionamento básico.
 */
export class BasicGame implements IGame {
  private screepsOperationValue: IScreepsOperation | null = null;

  /**
   * Objetos presentes no ambiente do Screeps
   * @private
   */
  private get screepsOperation(): IScreepsOperation {
    if (this.screepsOperationValue === null) {
      throw new EmptyError('Value is not defined.');
    }
    return this.screepsOperationValue;
  }

  /**
   * Inicializa a classe.
   * @param screepEnvironment
   * @private
   */
  private initialize(screepEnvironment: IScreepsOperation) {
    this.screepsOperationValue = screepEnvironment;
  }

  /**
   * Implementada a lógica do loop do jogo.
   * @param screepsOperation Propriedades que lidam diretamente com o ambiente do Screeps.
   */
  public loop(screepsOperation: IScreepsOperation): void {
    this.initialize(screepsOperation);
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
    this.tryUpgradeController();
  }

  private getSpawn(): StructureSpawn {
    const spawns = this.screepsOperation.query.getSpawns();
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
      this.screepsOperation.query.calculateCost(harvestBodyPart);

    const spawn = this.getSpawn();
    if (spawn.room.energyAvailable < harvestBodyPartCost) return;

    const creepName = NameGenerator.firstAndLastName;
    spawn.spawnCreep([WORK, CARRY, MOVE], creepName, {
      memory: { roleHarvest: Math.random() * 2 >= 1 }
    });

    Logger.post('Creep created: {creepName}.', { creepName }, LogLevel.Debug);
  }

  private tryHarvestEnergy(): void {
    const spawn = this.getSpawn();

    const source = spawn.room
      .find(FIND_SOURCES)
      .find(source => source.energyCapacity > 0);
    if (!source) return;

    const creeps = this.screepsOperation.query
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

    const creeps = this.screepsOperation.query
      .getCreeps()
      .filter(
        creep =>
          creep.room.name === spawn.room.name &&
          (creep.memory as KeyValue)['roleHarvest'] &&
          creep.store.getFreeCapacity() === 0 &&
          !(creep.memory as KeyValue)['upgrading']
      );

    for (const creep of creeps) {
      if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
  }

  private tryUpgradeController(): void {
    const spawn = this.getSpawn();
    const controller = spawn.room.controller;

    if (!controller) return;

    const creeps = this.screepsOperation.query
      .getCreeps()
      .filter(
        creep =>
          creep.room.name === spawn.room.name &&
          !(creep.memory as KeyValue)['roleHarvest'] &&
          (creep.store.getFreeCapacity() === 0 ||
            (creep.memory as KeyValue)['upgrading'])
      );

    for (const creep of creeps) {
      const code = creep.upgradeController(controller);
      if (code === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }
      (creep.memory as KeyValue)['upgrading'] =
        creep.store.getUsedCapacity() > 0;
    }
  }
}
