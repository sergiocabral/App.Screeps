import {
  HelperList,
  KeyValue,
  Logger,
  LogLevel,
  NotImplementedError
} from '@sergiocabral/helper';
import { BodyPart, NameGenerator } from '@sergiocabral/screeps';
import { BaseGame } from '../../../Infrastructure/Core/BaseGame';
import { SpawnWrapper } from '../../../Infrastructure/Screeps/Entity/SpawnWrapper';
import { CreepWrapper } from '../../../Infrastructure/Screeps/Entity/CreepWrapper';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class UpgradeController extends BaseGame {
  /**
   * Ajuda para os comandos.
   */
  public override help = 'Modo atual do jogo: fazer upgrade do controller.';

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    this.tryCreateCreep();
    this.tryHarvestEnergy();
    this.tryTransferEnergyToSpawn();
    this.tryUpgradeController();
  }

  private getSpawn(): SpawnWrapper {
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
    const creepsLimit = 25;
    if (this.screepsOperation.query.getCreeps().length >= creepsLimit) return;

    const harvestBodyPart = [WORK, CARRY, MOVE];
    const harvestBodyPartCost = BodyPart.calculateCost(harvestBodyPart);

    const spawn = this.getSpawn();
    if (spawn.instance.room.energyAvailable < harvestBodyPartCost) return;

    const creepName = NameGenerator.random();
    spawn.instance.spawnCreep([WORK, CARRY, MOVE], creepName, {
      memory: { roleHarvest: Math.random() * 4 <= 1 }
    });

    Logger.post('Creep created: {creepName}.', { creepName }, LogLevel.Debug);
  }

  private tryHarvestEnergy(): void {
    const spawn = this.getSpawn();

    const creeps = this.screepsOperation.query
      .getCreeps()
      .filter(
        creep =>
          creep.instance.room.name === spawn.instance.room.name &&
          creep.instance.store.getFreeCapacity() > 0
      );

    const allSources = spawn.instance.room.find(FIND_SOURCES);
    const getSource = (creep: CreepWrapper): Source | null => {
      const sources = allSources.filter(source => source.energyCapacity > 0);
      const sourceId = (creep.instance.memory as KeyValue)['sourceId'] as
        | string
        | undefined;
      if (sourceId) {
        const source = sources.find(source => source.id === sourceId);
        if (source) return source;
      } else {
        const source = HelperList.getRandom(sources);
        if (source) {
          (creep.instance.memory as KeyValue)['sourceId'] = source.id;
          return source;
        }
      }
      return null;
    };

    for (const creep of creeps) {
      const source = getSource(creep);
      if (!source) continue;
      if (creep.instance.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(source);
      }
    }
  }

  private tryTransferEnergyToSpawn(): void {
    const spawn = this.getSpawn();

    const creeps = this.screepsOperation.query
      .getCreeps()
      .filter(
        creep =>
          creep.instance.room.name === spawn.instance.room.name &&
          (creep.instance.memory as KeyValue)['roleHarvest'] &&
          creep.instance.store.getFreeCapacity() === 0 &&
          !(creep.instance.memory as KeyValue)['upgrading']
      );

    for (const creep of creeps) {
      if (
        creep.instance.transfer(spawn.instance, RESOURCE_ENERGY) ===
        ERR_NOT_IN_RANGE
      ) {
        creep.instance.moveTo(spawn.instance);
      }
    }
  }

  private tryUpgradeController(): void {
    const spawn = this.getSpawn();
    const controller = spawn.instance.room.controller;

    if (!controller) return;

    const creeps = this.screepsOperation.query
      .getCreeps()
      .filter(
        creep =>
          creep.instance.room.name === spawn.instance.room.name &&
          !(creep.instance.memory as KeyValue)['roleHarvest'] &&
          (creep.instance.store.getFreeCapacity() === 0 ||
            (creep.instance.memory as KeyValue)['upgrading'])
      );

    for (const creep of creeps) {
      const code = creep.instance.upgradeController(controller);
      if (code === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(controller);
      }
      (creep.instance.memory as KeyValue)['upgrading'] =
        creep.instance.store.getUsedCapacity() > 0;
    }
  }
}
