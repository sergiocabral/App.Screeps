import { CreepWrapper } from '../../Entity/CreepWrapper';
import { QueryBase } from './QueryBase';

/**
 * Consulta informações do jogo: Creeps
 */
export class QueryCreep extends QueryBase {
  /**
   * Retorna a lista dos creeps existentes.
   */
  public list(): CreepWrapper[] {
    return this.getNamedEntities<Creep, CreepWrapper>(
      this.screepsEnvironment.game.creeps,
      CreepWrapper
    );
  }

  /**
   * Localiza um creep pelo nome.
   */
  public get(name: string): CreepWrapper | null {
    return this.getNamedEntity<Creep, CreepWrapper>(name, this.list());
  }
}
