import { SpawnWrapper } from '../../Wrapper/SpawnWrapper';
import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { FilterSpawn } from './Filter/FilterSpawn';
import { GetById } from './GetBy/GetById';
import { GetByName } from './GetBy/GetByName';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { GetByRoom } from './GetBy/GetByRoom';

/**
 * Classe para consultar de entidades: Spawn
 */
export class QuerySpawn extends QueryIdOrNameBase<
  StructureSpawn,
  SpawnWrapper,
  FilterSpawn
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.memoryEntryForGarbageCollector.push('spawns');
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override readonly instances = this.screepsEnvironment.game.spawns;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly wrapperConstructor = SpawnWrapper;

  /**
   * Consulta por: id
   */
  public readonly getById = new GetById(this);

  /**
   * Consulta por: nome
   */
  public readonly getByName = new GetByName(this);

  /**
   * Consulta por: room
   */
  public readonly getByRoom = new GetByRoom(this);
}
