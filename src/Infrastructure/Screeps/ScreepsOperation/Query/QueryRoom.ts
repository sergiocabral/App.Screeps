import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { GetByName } from './GetBy/GetByName';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { FilterRoom } from './Filter/FilterRoom';
import { RoomWrapper } from '../../Wrapper/RoomWrapper';
import { KeyValue } from '@sergiocabral/helper';

/**
 * Classe para consultar de entidades: Room
 */
export class QueryRoom extends QueryIdOrNameBase<
  Room,
  RoomWrapper,
  FilterRoom
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.memoryEntryForGarbageCollector.push('rooms');
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override getInstances(): KeyValue<Room> {
    return this.screepsEnvironment.game.rooms;
  }

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly createWrapper = RoomWrapper;

  /**
   * Consulta por: nome
   */
  public readonly getByName = new GetByName(this);

  /**
   * Retorna a lista de sala que possua um ou mais spawn.
   */
  public getSpawned(): RoomWrapper[] {
    const map = new Map<string, RoomWrapper>();
    Object.values(this.screepsEnvironment.game.spawns).forEach(spawn =>
      map.set(
        spawn.room.name,
        new RoomWrapper(spawn.room, this.screepsEnvironment)
      )
    );
    return Array.from(map.values());
  }
}
