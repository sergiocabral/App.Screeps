import { HelperList, Logger, LogLevel } from '@sergiocabral/helper';
import { SpawnWrapper } from '../../../Infrastructure/Screeps/Wrapper/SpawnWrapper';
import { GameMode } from '../../Core/GameMode';
import { CreepRole } from '../../Screeps/Creep/CreepRole';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class UpgradeController extends GameMode {
  /**
   * Descrição do modo do jogo.
   */
  protected override readonly description = 'Fazer upgrade do controller.';

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    for (const spawn of this.screepsOperation.query.spawn.getAll()) {
      this._tryCreateCreep(spawn);
      this._assignSourceEnergy(spawn);
      this._tryHarvestEnergy(spawn);
      this._tryTransferEnergyToSpawn(spawn);
      this._tryUpgradeController(spawn);
    }
  }

  /**
   * Tenta criar um creep.
   * @private
   */
  private _tryCreateCreep(spawn: SpawnWrapper): void {
    const creepsLimit = 25;
    if (this.screepsOperation.query.creep.getAll().length < creepsLimit) {
      const fiftyFifty = Math.floor(Math.random() * 10) % 2 === 0;
      const role = fiftyFifty
        ? CreepRole.BasicHarvest
        : CreepRole.BasicUpgrader;
      const creep = this.factoryCreep.create(spawn, role);
      if (creep) {
        creep.properties.set('job', role);
        Logger.post(
          'Creep created: {creep}. Roles: {roles}. Job: {job}',
          {
            creep,
            job: role,
            roles: creep.roles
          },
          LogLevel.Debug
        );
      }
    }
  }

  private _assignSourceEnergy(spawn: SpawnWrapper): void {
    const sources = spawn.instance.room.find(FIND_SOURCES);
    if (sources.length === 0) return;

    const creeps = this.screepsOperation.query.creep
      .filter({
        withRoom: [spawn.instance.room],
        withoutProperties: ['source']
      })
      .filter(creep => creep.instance.store.getFreeCapacity() > 0);

    for (const creep of creeps) {
      creep.properties.set('source', HelperList.getRandom(sources).id);
    }
  }

  private _tryHarvestEnergy(spawn: SpawnWrapper): void {
    const sources = spawn.instance.room.find(FIND_SOURCES);
    for (const source of sources) {
      const creeps = this.screepsOperation.query.creep.filter({
        withRoom: [spawn.instance.room],
        withPropertyValues: ['source', [source.id]]
      });
      for (const creep of creeps) {
        if (creep.instance.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.instance.moveTo(source);
        }
      }
    }
  }

  private _tryTransferEnergyToSpawn(spawn: SpawnWrapper): void {
    const creeps = this.screepsOperation.query.creep
      .filter({
        withRoom: [spawn.instance.room],
        withPropertyValues: ['job', [CreepRole.BasicHarvest]],
        withoutProperties: ['upgrading']
      })
      .filter(creep => creep.instance.store.getFreeCapacity() === 0);

    for (const creep of creeps) {
      if (
        creep.instance.transfer(spawn.instance, RESOURCE_ENERGY) ===
        ERR_NOT_IN_RANGE
      ) {
        creep.instance.moveTo(spawn.instance);
      }
    }
  }

  private _tryUpgradeController(spawn: SpawnWrapper): void {
    const controller = spawn.instance.room.controller;
    if (!controller) return;

    const creeps = this.screepsOperation.query.creep
      .filter({
        withRoom: [spawn.instance.room],
        withoutPropertyValues: ['job', [CreepRole.BasicUpgrader]]
      })
      .filter(
        creep =>
          creep.properties.has('upgrading') ||
          creep.instance.store.getFreeCapacity() === 0
      );

    for (const creep of creeps) {
      const code = creep.instance.upgradeController(controller);
      if (code === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(controller);
      }
      if (creep.instance.store.getUsedCapacity() > 0) {
        creep.properties.set('upgrading', true);
      } else {
        creep.properties.remove('upgrading');
      }
    }
  }
}