import { HelperList, Logger, LogLevel } from '@sergiocabral/helper';
import { SpawnWrapper } from '../../../Infrastructure/Screeps/Entity/SpawnWrapper';
import { ModeBase } from '../../ModeBase';
import { CreepRole } from '../../CreepRole';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class UpgradeControllerV2 extends ModeBase {
  /**
   * Ajuda para os comandos.
   */
  public override help = 'Modo atual do jogo: fazer upgrade do controller.';

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    for (const spawn of this.screepsOperation.query.spawn.getAll()) {
      this.tryCreateCreep(spawn);
      this.assignSourceEnergy(spawn);
      this.tryHarvestEnergy(spawn);
      this.tryTransferEnergyToSpawn(spawn);
      this.tryUpgradeController(spawn);
    }
  }

  /**
   * Tenta criar um creep.
   * @private
   */
  private tryCreateCreep(spawn: SpawnWrapper): void {
    const creepsLimit = 4;
    if (this.screepsOperation.query.creep.getAll().length < creepsLimit) {
      const fiftyFifty = Math.floor(Math.random() * 10) % 2 === 0;
      const role = fiftyFifty ? CreepRole.Harvest : CreepRole.Upgrader;
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

  private assignSourceEnergy(spawn: SpawnWrapper): void {
    const sources = spawn.instance.room.find(FIND_SOURCES);
    if (sources.length === 0) return;

    const creeps = this.screepsOperation.query.creep
      .filter({
        withSpawn: [spawn],
        withoutProperties: ['source']
      })
      .filter(creep => creep.instance.store.getFreeCapacity() > 0);

    for (const creep of creeps) {
      creep.properties.set('source', HelperList.getRandom(sources).id);
    }
  }

  private tryHarvestEnergy(spawn: SpawnWrapper): void {
    const sources = spawn.instance.room.find(FIND_SOURCES);
    for (const source of sources) {
      const creeps = this.screepsOperation.query.creep.filter({
        withSpawn: [spawn],
        withPropertyValues: ['source', [source.id]]
      });
      for (const creep of creeps) {
        if (creep.instance.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.instance.moveTo(source);
        }
      }
    }
  }

  private tryTransferEnergyToSpawn(spawn: SpawnWrapper): void {
    const creeps = this.screepsOperation.query.creep
      .filter({
        withSpawn: [spawn],
        withPropertyValues: ['job', [CreepRole.Harvest]],
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

  private tryUpgradeController(spawn: SpawnWrapper): void {
    const controller = spawn.instance.room.controller;
    if (!controller) return;

    const creeps = this.screepsOperation.query.creep
      .filter({
        withSpawn: [spawn],
        withoutPropertyValues: ['job', [CreepRole.Upgrader]]
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
