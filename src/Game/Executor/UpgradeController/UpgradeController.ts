import { GameExecutor } from '../../Core/GameExecutor';
import {
  HelperList,
  HelperNumeric,
  Logger,
  LogLevel
} from '@sergiocabral/helper';
import { CreepRole } from '../../Screeps/Creep/CreepRole';
import { RoomWrapper } from '../../../Infrastructure/Screeps/Wrapper/RoomWrapper';
import { Work } from './Work';
import { Property } from './Property';
import { Constant } from '@sergiocabral/screeps';
import { WithId } from '../../../Infrastructure/Type/WithId';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class UpgradeController extends GameExecutor {
  /**
   * Descrição do modo do jogo.
   */
  protected override readonly description = 'Laboratório de estratégias.';

  private _getCreepsCountLimit(room: Room): number {
    const value = Number(this.parameterByFlag.getValues(room, 'creeps')[0]);
    return Number.isFinite(value) ? value : 10;
  }

  private _getRooms(): RoomWrapper[] {
    return this.screepsOperation.query.room.getSpawned();
  }

  private _createCreep(room: Room): void {
    const creeps = this.screepsOperation.query.creep.getByRoom.with(room);
    if (creeps.length >= this._getCreepsCountLimit(room)) return;

    const spawns = this.screepsOperation.query.spawn.getByRoom.with(room);
    spawns.forEach(spawn =>
      this.factoryCreep.create(spawn.instance, CreepRole.BasicHarvest)
    );
  }

  private _assignWorkToAwayCreeps(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty
      .without(Property.Work)
      .filter(creep => !creep.instance.spawning);
    if (creeps.length === 0) return;

    for (const creep of creeps) {
      const sources = this.screepsOperation.query.source
        .preFilter({
          room: creep.instance.room,
          onlyActives: true
        })
        .getAll();
      if (sources.length === 0) continue;
      creep.properties.set(Property.Work, Work.Harvesting);
      creep.properties.set(
        Property.Target,
        HelperList.getRandom(sources)?.instance.id
      );
      creep.instance.say('Harvest');
    }
  }

  private _harvest(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty.withValue(
      Property.Work,
      Work.Harvesting
    );
    if (creeps.length === 0) return;

    for (const creep of creeps) {
      const sourceId = creep.properties.get(Property.Target);
      const source = this.screepsOperation.query.getById<Source>(sourceId);
      if (!source) {
        creep.instance.say('No Source!');
        creep.properties.remove(Property.Work);
        Logger.post(
          'Source "{source}" was not found by creep "{creep}".',
          { creep: creep.instance.name, source: sourceId },
          LogLevel.Error,
          this._loggerContext
        );
        continue;
      }

      const returnCode = creep.instance.harvest(source);
      if (returnCode === OK) {
        if (creep.instance.store.getFreeCapacity() === 0) {
          const constructions = Array<WithId>();
          constructions.push(
            ...creep.instance.room
              .find(FIND_MY_CONSTRUCTION_SITES)
              .sort((a: ConstructionSite, b: ConstructionSite) =>
                HelperNumeric.reverseCompare(a.progress, b.progress)
              )
          );
          constructions.push(
            ...creep.instance.room
              .find(FIND_STRUCTURES)
              .filter(structure => structure.hits < structure.hitsMax)
              .sort((a: Structure, b: Structure) =>
                HelperNumeric.reverseCompare(
                  a.hitsMax - a.hits,
                  b.hitsMax - b.hits
                )
              )
          );
          const construction = constructions[0];
          if (construction) {
            creep.properties.set(Property.Work, Work.Building);
            creep.properties.set(Property.Target, construction.id);
            creep.instance.say('Build');
          } else {
            creep.properties.set(Property.Work, Work.UpgradingController);
            creep.properties.remove(Property.Target);
            creep.instance.say('Upgrade');
          }
        }
      } else if (returnCode === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(source);
      } else {
        Logger.post(
          'Unexpected code when creep "{creep}" harvested energy at source "{source}": {returnCode}',
          {
            creep: creep.instance.name,
            source: source.id,
            returnCode: Constant.format(returnCode)
          },
          LogLevel.Error,
          this._loggerContext
        );
      }
    }
  }

  private _build(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty.withValue(
      Property.Work,
      Work.Building
    );
    if (creeps.length === 0) return;

    for (const creep of creeps) {
      const constructionId = creep.properties.get(Property.Target);
      const construction =
        this.screepsOperation.query.getById<WithId>(constructionId);
      if (!construction) {
        creep.instance.say('No Build!');
        creep.properties.set(Property.Work, Work.UpgradingController);
        creep.properties.remove(Property.Target);
        Logger.post(
          'Construction "{construction}" was not found by creep "{creep}".',
          { creep: creep.instance.name, construction: constructionId },
          LogLevel.Error,
          this._loggerContext
        );
        continue;
      }

      const isRepair = construction instanceof Structure;
      const returnCode = isRepair
        ? creep.instance.repair(construction)
        : creep.instance.build(construction as ConstructionSite);
      if (returnCode === OK) {
        if (creep.energy.usedAsPercent >= 0.33 || isRepair) {
          creep.properties.set(Property.Work, Work.UpgradingController);
          creep.properties.remove(Property.Target);
          creep.instance.say('Upgrade');
        }
      } else if (returnCode === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(construction as unknown as { pos: RoomPosition });
      } else {
        Logger.post(
          'Unexpected code when creep "{creep}" builds the construction "{construction}": {returnCode}',
          {
            creep: creep.instance.name,
            construction: construction.id,
            returnCode: Constant.format(returnCode)
          },
          LogLevel.Error,
          this._loggerContext
        );
      }
    }
  }

  private _upgrade(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty.withValue(
      Property.Work,
      Work.UpgradingController
    );
    if (creeps.length === 0) return;

    for (const creep of creeps) {
      if (!creep.instance.room.controller) continue;

      const returnCode = creep.instance.upgradeController(
        creep.instance.room.controller
      );
      if (returnCode === OK) {
        if (creep.energy.usedAsPercent >= 0.66) {
          creep.properties.set(Property.Work, Work.TransferringEnergy);
          creep.properties.set(
            Property.Target,
            HelperList.getRandom(
              this.screepsOperation.query.spawn.getByRoom.with(
                creep.instance.room
              )
            )?.instance.name
          );
          creep.instance.say('Transfer');
        }
      } else if (returnCode === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(creep.instance.room.controller);
      } else {
        Logger.post(
          'Unexpected code when creep "{creep}" upgraded controller "{controller}": {returnCode}',
          {
            creep: creep.instance.name,
            controller: creep.instance.room.controller.id,
            returnCode: Constant.format(returnCode)
          },
          LogLevel.Error,
          this._loggerContext
        );
      }
    }
  }

  private _transferEnergy(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty.withValue(
      Property.Work,
      Work.TransferringEnergy
    );
    if (creeps.length === 0) return;

    for (const creep of creeps) {
      const spawnName = creep.properties.get(Property.Target) ?? '';
      const spawn =
        this.screepsOperation.query.spawn.getByName.with(spawnName)[0];
      if (!spawn) {
        creep.instance.say('No Spawn!');
        creep.properties.remove(Property.Work);
        Logger.post(
          'Spawn "{spawn}" was not found by creep "{creep}".',
          { creep: creep.instance.name, spawn: spawnName },
          LogLevel.Error,
          this._loggerContext
        );
        continue;
      }

      const returnCode = creep.instance.transfer(
        spawn.instance,
        RESOURCE_ENERGY
      );
      if (returnCode === OK || returnCode === ERR_FULL) {
        const resources = Array<WithId>();
        resources.push(...creep.instance.room.find(FIND_TOMBSTONES));
        resources.push(...creep.instance.room.find(FIND_DROPPED_RESOURCES));
        const resource = HelperList.getRandom(resources);
        if (resource) {
          creep.properties.set(Property.Work, Work.Withdrawing);
          creep.properties.set(Property.Target, resource.id);
          creep.instance.say('Withdraw');
        } else {
          creep.properties.remove(Property.Work);
          creep.instance.say('Finished');
        }
      } else if (returnCode === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(spawn.instance);
      } else {
        Logger.post(
          'Unexpected code when creep "{creep}" transferred energy to spawn "{spawn}": {returnCode}',
          {
            creep: creep.instance.name,
            spawn: spawn.instance.name,
            returnCode: Constant.format(returnCode)
          },
          LogLevel.Error,
          this._loggerContext
        );
      }
    }
  }

  private _withdraw(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty.withValue(
      Property.Work,
      Work.Withdrawing
    );
    if (creeps.length === 0) return;

    for (const creep of creeps) {
      const resourceId = creep.properties.get(Property.Target);
      const resource = this.screepsOperation.query.getById<WithId>(resourceId);
      if (!resource) {
        creep.instance.say('No Tomb!');
        creep.properties.remove(Property.Work);
        creep.properties.remove(Property.Target);
        Logger.post(
          'Resource energy "{resource}" was not found by creep "{creep}".',
          { creep: creep.instance.name, resource: resourceId },
          LogLevel.Error,
          this._loggerContext
        );
        continue;
      }

      const isTombstone = Boolean((resource as unknown as Tombstone).creep);
      const returnCode = isTombstone
        ? creep.instance.withdraw(resource as Tombstone, RESOURCE_ENERGY)
        : creep.instance.pickup(resource as Resource);
      if (returnCode === OK) {
        if (creep.instance.store.getFreeCapacity() === 0) {
          creep.properties.set(Property.Work, Work.UpgradingController);
          creep.properties.remove(Property.Target);
          creep.instance.say('Upgrade');
        } else {
          creep.properties.remove(Property.Work);
          creep.instance.say('Finished');
        }
      } else if (returnCode === ERR_NOT_IN_RANGE) {
        creep.instance.moveTo(resource as unknown as { pos: RoomPosition });
      } else {
        Logger.post(
          'Unexpected code when creep "{creep}" withdrawn energy from tombstone/resource "{resource}": {returnCode}',
          {
            creep: creep.instance.name,
            resource: resource.id,
            returnCode: Constant.format(returnCode)
          },
          LogLevel.Error,
          this._loggerContext
        );
      }
    }
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    this._getRooms().forEach(room => this._createCreep(room.instance));
    this._assignWorkToAwayCreeps();
    this._harvest();
    this._build();
    this._upgrade();
    this._transferEnergy();
    this._withdraw();
  }
}
