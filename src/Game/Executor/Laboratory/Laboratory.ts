import { GameExecutor } from '../../Core/GameExecutor';
import { HelperNumeric } from '@sergiocabral/helper';
import { CreepRole } from '../../Screeps/Creep/CreepRole';
import { RoomWrapper } from '../../../Infrastructure/Screeps/Wrapper/RoomWrapper';
import { Action } from './Action';

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
   * Nome da propriedade action.
   * @private
   */
  private readonly _propertyAction = 'action';

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

  /**
   * Ajusta novos creeps
   * @private
   */
  private _adjustNewCreeps(): void {
    const creeps = this.screepsOperation.query.creep.getByProperty.empty();
    if (creeps.length === 0) {
      this.debug('No new creeps detected.');
      return;
    }

    this.debug('New creeps detected: {creepsCount}, {creeps}', () => {
      return {
        creepsCount: creeps.length,
        creeps: creeps.map(creep => `"${creep.instance.name}"`).join(', ')
      };
    });

    const action = Action.Nothing;
    for (const creep of creeps) {
      creep.properties.set(this._propertyAction, action);
      this.debug('Assigned action "{action}" to creep "{creep}".', {
        creep,
        action
      });
    }
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    this._getRoomsSpawned().forEach(room => this._createCreep(room.instance));
    this._adjustResetCreeps();
    this._adjustNewCreeps();
    /**
     * TODO:
     * carga livre > designar energia > coletar
     * carga completa > ir para spawn/controller encher metade/metade
     */
  }
}
