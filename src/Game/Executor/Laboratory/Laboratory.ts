import { GameExecutor } from '../../Core/GameExecutor';

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
   * Retorna o limite de creep por sala.
   * @param room
   * @private
   */
  private _getCreepsCountLimit(room: Room): number {
    let creepsCountLimit = this._defaultCreepsCountLimit;
    const regexCreepsCountLimit = /^creeps:\s*(\d+)$/;
    for (const flag of this.screepsOperation.query.flag.getByRoom.with(room)) {
      creepsCountLimit = Number(
        (regexCreepsCountLimit.exec(flag.instance.name) ?? [])[1]
      );
      if (Number.isFinite(creepsCountLimit)) {
        this.debug(
          'Room "{room}" with creeps limit FROM FLAG "{flag}": {creepsCountLimit}',
          { room: room.name, flag: flag.instance.name, creepsCountLimit }
        );
        return creepsCountLimit;
      }
    }
    this.debug(
      'Room "{room}" with creeps limit FROM DEFAULT VALUE: {creepsCountLimit}',
      { room: room.name, creepsCountLimit }
    );
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
    this.debug('Room "{room}" with {creepCount} creeps.', {
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
    if (this._getCreepsCount(room) < this._getCreepsCountLimit(room)) {
      this.debug('CRIAR CREEP AQUI');
      //const spawns = this.screepsOperation.query.spawn.getByRoom.with(
      //  room.instance
      //);
      //for (const spawn of spawns) {
      //  this.factoryCreep.create(spawn.instance, CreepRole.BasicHarvest);
      //  //TODO: Continuar aqui
      //}
    }
  }

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    const rooms = this.screepsOperation.query.room.getSpawned();
    this.debug('Rooms spawned ({roomCount}): {rooms}', () => {
      return {
        roomCount: rooms.length,
        rooms: rooms.map(room => `"${room.instance.name}"`).join(', ')
      };
    });
    for (const room of rooms) {
      this.debug('Selected room "{room}".', { room: room.instance.name });
      this._createCreep(room.instance);
    }
  }
}
