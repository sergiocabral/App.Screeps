import { CreepWrapper } from '../../Wrapper/CreepWrapper';
import { FilterCreep } from './Filter/FilterCreep';
import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { FilterMatchRoom } from './FilterMatch/FilterMatchRoom';
import { GetById } from './GetBy/GetById';
import { GetByName } from './GetBy/GetByName';
import { GetByRoom } from './GetBy/GetByRoom';
import { KeyValue } from '@sergiocabral/helper';

/**
 * Classe para consultar de entidades: Creeps
 */
export class QueryCreep extends QueryIdOrNameBase<
  Creep,
  CreepWrapper,
  FilterCreep
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.filters.push(new FilterMatchRoom<Creep, CreepWrapper, FilterCreep>());
    this.memoryEntryForGarbageCollector.push('creeps');
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override getInstances(): KeyValue<Creep> {
    return this.screepsEnvironment.game.creeps;
  }

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly createWrapper = CreepWrapper;

  /**
   * Consulta por: id
   */
  public readonly getById = new GetById(this);

  /**
   * Consulta por: nome
   */
  public readonly getByName = new GetByName(this);

  /**
   * Consulta por: sala
   */
  public readonly getByRoom = new GetByRoom(this);
}
