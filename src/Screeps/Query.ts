/**
 * Consulta informações do jogo.
 */
import { EmptyError, KeyValue } from '@sergiocabral/helper';

export class Query {
  /**
   * Construtor.
   * @param game
   */
  constructor(private game: Game) {}

  /**
   * Retorna a lista dos spawns existentes.
   */
  public getSpawns(): KeyValue<StructureSpawn> {
    return Object.keys(this.game.spawns).reduce((result, spawnName) => {
      const spawn = this.game.spawns[spawnName];
      if (spawn === undefined) {
        throw new EmptyError(
          'Spawn expected {spawnName}'.querystring({ spawnName })
        );
      }
      result[spawnName] = spawn;
      return result;
    }, {} as KeyValue<StructureSpawn>);
  }
}
