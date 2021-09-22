import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { GetByName } from './GetBy/GetByName';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { FilterRoom } from './Filter/FilterRoom';
import { RoomWrapper } from '../../Wrapper/RoomWrapper';
import { SourceWrapper } from '../../Wrapper/SourceWrapper';

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
    this.memoryEntryForGarbageCollector.push('sources');
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override readonly instances = this.screepsEnvironment.game.rooms;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly wrapperConstructor = RoomWrapper;

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

  /**
   * Retorna a lista de fontes de energia na sala.
   */
  public getSources(
    room: Room,
    mode: 'all' | 'active' = 'active'
  ): SourceWrapper[] {
    return room
      .find(mode === 'all' ? FIND_SOURCES : FIND_SOURCES_ACTIVE)
      .map(source => new SourceWrapper(source, room, this.screepsEnvironment));
  }
}
