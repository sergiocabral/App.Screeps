import { GameExecutor } from '../../Core/GameExecutor';
import { HelperList, HelperNumeric } from '@sergiocabral/helper';
import { CreepRole } from '../../Screeps/Creep/CreepRole';
import { RoomWrapper } from '../../../Infrastructure/Screeps/Wrapper/RoomWrapper';
import { Action } from './Action';
import { Constant } from '@sergiocabral/screeps';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class Laboratory extends GameExecutor {
  /**
   * Descrição do modo do jogo.
   */
  protected override readonly description = 'Laboratório de estratégias.';

  /**
   * Valor padrão do limite de creep por room.
   * @private
   */
  private readonly _defaultCreepsCountLimit = 5;

  /**
   * Nome da propriedade: action, ação em curso.
   * @private
   */
  private readonly _propertyAction = 'action';

  /**
   * Nome da propriedade: source, fonte de energia para onde vai
   * @private
   */
  private readonly _propertySource = 'source';

  /**
   * Nome da propriedade: destination, para onde ele vai andar
   * @private
   */
  private readonly _propertyDestination = 'walkingTo';

  /**
   * Retorna o limite de creep por sala.
   * @param room
   * @private
   */
  private _getCreepsCountLimit(room: Room): number {
    const regexCreepsCountLimit = /^creeps:\s*(\d+)$/;
    let creepsCountLimit: number;
    const creepsCountLimitValues = Array<number>();

    const flags = this.screepsOperation.query.flag.getByRoom.with(room);
    this.debug('"{room}" room with {flagCount} flags.', {
      room: room.name,
      flagCount: flags.length
    });

    for (const flag of flags) {
      creepsCountLimit = Number(
        (regexCreepsCountLimit.exec(flag.instance.name) ?? [])[1]
      );
      if (Number.isFinite(creepsCountLimit)) {
        this.debug(
          '"{room}" room with creeps limit from flag "{flag}": {creepsCountLimit}',
          { room: room.name, flag: flag.instance.name, creepsCountLimit }
        );
        creepsCountLimitValues.push(creepsCountLimit);
      }
    }

    creepsCountLimitValues.sort(HelperNumeric.sortCompare);
    creepsCountLimit = creepsCountLimitValues[0] ?? -1;

    if (creepsCountLimit < 0) {
      creepsCountLimit = this._defaultCreepsCountLimit;
      this.debug(
        '"{room}" room with creeps limit from default value: {creepsCountLimit}',
        { room: room.name, creepsCountLimit }
      );
      return creepsCountLimit;
    } else if (creepsCountLimitValues.length > 1) {
      this.debug(
        '"{room}" room defined with lowest value from flags: {creepsCountLimit}',
        { room: room.name, creepsCountLimit }
      );
    }

    return creepsCountLimit;
  }

  /**
   * Total de creeps na sala.
   * @param room
   * @private
   */
  private _getCreepsCount(room: Room): number {
    const creepCount =
      this.screepsOperation.query.creep.getByRoom.with(room).length;
    this.debug('"{room}" room with {creepCount} creeps.', {
      room: room.name,
      creepCount
    });
    return creepCount;
  }

  /**
   * Cria creeps na sala.
   * @param room
   * @private
   */
  private _createCreep(room: Room): void {
    const limit = this._getCreepsCountLimit(room);
    const creeps = this._getCreepsCount(room);
    if (creeps >= limit) {
      this.debug('"{room}" room creeps limit reached.', { room: room.name });
      return;
    }

    const spawns = this.screepsOperation.query.spawn.getByRoom.with(room);
    this.debug(
      'Spawns found in the "{room}" room: {spawnCount}, {spawns}',
      () => {
        return {
          room: room.name,
          spawnCount: spawns.length,
          spawns: spawns.map(spawn => `"${spawn.instance.name}"`).join(', ')
        };
      }
    );

    for (const spawn of spawns) {
      this.debug('Trying to create a {role} creep in the "{room}" room.', {
        room: room.name,
        role: CreepRole.BasicHarvest
      });
      const creep = this.factoryCreep.create(
        spawn.instance,
        CreepRole.BasicHarvest
      );
      if (creep) {
        this.debug(
          '{role} creep created in the "{room}" room with the name "{creep}".',
          {
            room: room.name,
            creep: creep.instance.name,
            role: CreepRole.BasicHarvest
          }
        );
      } else {
        this.debug('No creep created in the "{room}" room.', {
          room: room.name
        });
      }
    }
  }

  /**
   * Retorna a lista de salas que podem ser operadas por um spawn.
   * @private
   */
  private _getRoomsSpawned(): RoomWrapper[] {
    const rooms = this.screepsOperation.query.room.getSpawned();
    this.debug('Rooms spawned: {roomCount}, {rooms}', () => {
      return {
        roomCount: rooms.length,
        rooms: rooms.map(room => `"${room.instance.name}"`).join(', ')
      };
    });
    return rooms;
  }

  /**
   * Ajusta creeps sem definição.
   * @private
   */
  private _adjustResetCreeps(): void {
    const creeps = this.screepsOperation.query.creep.getByRole.empty();
    if (creeps.length === 0) {
      this.debug('No reset creeps detected.');
      return;
    }

    this.debug('New reset detected: {creepsCount}, {creeps}', () => {
      return {
        creepsCount: creeps.length,
        creeps: creeps.map(creep => `"${creep.instance.name}"`).join(', ')
      };
    });

    this.factoryCreep.redefine(...creeps);

    this.debug('Reset creeps have been adjusted.');
  }

  private _assignWorkToAwayCreeps() {
    const creeps = this.screepsOperation.query.creep.getByProperty.without(
      this._propertyAction
    );
    if (creeps.length === 0) {
      this.debug('No away creeps detected.');
      return;
    }

    for (const creep of creeps) {
      if (creep.instance.store.getUsedCapacity() === 0) {
        const source = HelperList.getRandom(
          this.screepsOperation.query.room.getSources(creep.instance.room)
        );

        if (!source) {
          this.debug('No source found for creep "{creep}".', {
            creep: creep.instance.name
          });
          continue;
        }

        creep.properties.set(this._propertyAction, Action.Harvesting);
        creep.properties.set(this._propertySource, source.instance.id);
        creep.properties.set(
          this._propertyDestination,
          `${source.instance.pos.x},${source.instance.pos.y}`
        );

        this.debug(
          'Randomly defined energy source {source} for away creep "{creep}".',
          {
            source: source.instance.id,
            creep: creep.instance.name
          }
        );
      }
    }
  }

  private _moveToHarvest() {
    const creeps = this.screepsOperation.query.creep.getByProperty.withValue(
      this._propertyAction,
      Action.Harvesting
    );
    if (creeps.length === 0) {
      this.debug('No walking creeps detected.');
      return;
    }

    for (const creep of creeps) {
      const destination = creep.properties.get(this._propertyDestination);
      const [x, y] = (destination ?? '').split(',').map(p => Number(p)) as [
        number,
        number
      ];
      if (!(x >= 0 && y >= 0)) {
        this.debug(
          'Invalid "{destination}" target position for creep "{creep}". Releasing him from work.',
          {
            destination,
            creep: creep.instance.name
          }
        );
        creep.properties.remove(this._propertyAction);
      }

      if (creep.instance.pos.x === x && creep.instance.pos.y === y) {
        this.debug('The creep "{creep}" reached the destination {x},{y}.', {
          x,
          y,
          creep: creep.instance.name
        });
        continue;
      }

      const statusCode = creep.instance.moveTo(x, y);
      this.debug(
        'Creep "{creep}" moving from {x0},{y0} to {x},{y}. Status code: {statusCode}',
        {
          x0: creep.instance.pos.x,
          y0: creep.instance.pos.y,
          x,
          y,
          creep: creep.instance.name,
          statusCode: Constant.format(statusCode)
        }
      );
    }
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    this._getRoomsSpawned().forEach(room => this._createCreep(room.instance));
    this._adjustResetCreeps();
    this._assignWorkToAwayCreeps();
    this._moveToHarvest();

    /**
     * TODO:
     * carga livre > designar energia > coletar
     * carga completa > ir para spawn/controller encher metade/metade
     */
  }
}
