/**
 * Consulta informações do jogo.
 */
import { KeyValue, ShouldNeverHappenError } from '@sergiocabral/helper';

export class Query {
  /**
   * Construtor.
   * @param game
   */
  constructor(private game: Game) {}

  /**
   * Retorna a lista dos spawns existentes.
   */
  private getEntity<T>(object: KeyValue<T>): KeyValue<T> {
    return Object.keys(object).reduce((result, name) => {
      const entity = object[name];
      if (entity === undefined) throw new ShouldNeverHappenError();
      result[name] = entity;
      return result;
    }, {} as KeyValue<T>);
  }

  /**
   * Retorna a lista dos spawns existentes.
   */
  public getSpawns(): KeyValue<StructureSpawn> {
    return this.getEntity<StructureSpawn>(this.game.spawns);
  }

  /**
   * Retorna a lista dos screeps existentes.
   */
  public getCreeps(): KeyValue<Creep> {
    return this.getEntity<Creep>(this.game.creeps);
  }
}
