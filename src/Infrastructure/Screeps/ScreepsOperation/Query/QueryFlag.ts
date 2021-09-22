import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { GetByName } from './GetBy/GetByName';
import { FlagWrapper } from '../../Wrapper/FlagWrapper';
import { FilterFlag } from './Filter/FilterFlag';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { GetByRoom } from './GetBy/GetByRoom';

/**
 * Classe para consultar de entidades: Flag
 */
export class QueryFlag extends QueryIdOrNameBase<
  Flag,
  FlagWrapper,
  FilterFlag
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.memoryEntryForGarbageCollector.push('flags');
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override readonly instances = this.screepsEnvironment.game.flags;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly wrapperConstructor = FlagWrapper;

  /**
   * Consulta por: nome
   */
  public readonly getByName = new GetByName(this);

  /**
   * Consulta por: room
   */
  public readonly getByRoom = new GetByRoom(this);
}
