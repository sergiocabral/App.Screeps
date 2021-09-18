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
    return this.getNamedEntities<StructureSpawn, SpawnWrapper>(
      this.screepsEnvironment.game.spawns,
      SpawnWrapper
    );
  }

  /**
   * Localiza um spawn pelo nome.
   */
  public get(name: string): SpawnWrapper | null {
    return this.getNamedEntity<StructureSpawn, SpawnWrapper>(name, this.list());
  }
}
