import { SpawnWrapper } from '../../Entity/SpawnWrapper';
import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { FilterSpawn } from './Filter/FilterSpawn';
import { GetById } from './GetBy/GetById';
import { GetByName } from './GetBy/GetByName';

/**
 * Classe para consultar de entidades: Spawn
 */
export class QuerySpawn extends QueryIdOrNameBase<
  StructureSpawn,
  SpawnWrapper,
  FilterSpawn
> {
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
}
