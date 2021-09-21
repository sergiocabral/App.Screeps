import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { GetByName } from './GetBy/GetByName';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { FilterRoom } from './Filter/FilterRoom';
import { RoomWrapper } from '../../Wrapper/RoomWrapper';

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
    this.memoryEntryForGarbageCollector = 'rooms';
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
}
