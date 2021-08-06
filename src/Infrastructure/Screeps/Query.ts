/**
 * Consulta informações do jogo.
 */
import { KeyValue, ShouldNeverHappenError } from '@sergiocabral/helper';
import { IScreepsEnvironment } from './IScreepsEnvironment';

export class Query {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(private screepsEnvironment: IScreepsEnvironment) {}

  /**
   * Retorna a lista dos spawns existentes.
   */
  private getEntity<T>(object: KeyValue<T>): T[] {
    return Object.keys(object).map(name => {
      const entity = object[name];
      if (entity === undefined) throw new ShouldNeverHappenError();
      return entity;
    });
  }

  /**
   * Retorna a lista dos spawns existentes.
   */
  public getSpawns(): StructureSpawn[] {
    return this.getEntity<StructureSpawn>(this.screepsEnvironment.game.spawns);
  }

  /**
   * Retorna a lista dos screeps existentes.
   */
  public getCreeps(): Creep[] {
    return this.getEntity<Creep>(this.screepsEnvironment.game.creeps);
  }

  /**
   * Calcula o custo para as partes de construção do creep.
   * @param bodyParts Partes de construção do creep
   */
  public calculateCost(bodyParts: BodyPartConstant[]): number {
    let cost = 0;
    for (const bodyPart of bodyParts) {
      cost += BODYPART_COST[bodyPart];
    }
    return cost;
  }
}
