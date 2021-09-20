import { CreepWrapper } from '../../Entity/CreepWrapper';
import { FilterCreep } from './Filter/FilterCreep';
import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { FilterMatchRoom } from './FilterMatch/FilterMatchRoom';
import { GetById } from './GetBy/GetById';
import { GetByName } from './GetBy/GetByName';
import { GetByRoom } from './GetBy/GetByRoom';

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
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override readonly instances = this.screepsEnvironment.game.creeps;

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly wrapperConstructor = CreepWrapper;

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
