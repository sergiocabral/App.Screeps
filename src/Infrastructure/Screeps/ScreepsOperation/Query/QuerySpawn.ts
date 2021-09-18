import { QueryBase } from './QueryBase';
import { SpawnWrapper } from '../../Entity/SpawnWrapper';

/**
 * Consulta informações do jogo: Spawn
 */
export class QuerySpawn extends QueryBase {
  /**
   * Retorna a lista dos spawns existentes.
   */
  public list(): SpawnWrapper[] {
    return this.getNamedEntity<StructureSpawn, SpawnWrapper>(
      this.screepsEnvironment.game.spawns,
      SpawnWrapper
    );
  }
}
