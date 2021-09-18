import { IScreepsOperation } from '../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { CreepWrapper } from '../Infrastructure/Screeps/Entity/CreepWrapper';
import { SpawnWrapper } from '../Infrastructure/Screeps/Entity/SpawnWrapper';
import { BodyPartSet } from '@sergiocabral/screeps';

/**
 * Constrói instâncias de creeps;
 */
export class FactoryCreep {
  /**
   * Construtor.
   * @param screepsOperation
   */
  public constructor(private readonly screepsOperation: IScreepsOperation) {}

  /**
   * Coletor de energia básico.
   * @param spawn
   */
  public basicHarvest(spawn: SpawnWrapper): CreepWrapper | null {
    const bodyPartSet: BodyPartSet = {
      move: 1,
      work: 1,
      carry: 1
    };
    if (this.screepsOperation.entity.creep.canCreate(spawn, bodyPartSet)) {
      const creep = this.screepsOperation.entity.creep.create(
        spawn,
        bodyPartSet
      );
      creep?.roles.add('basicHarvest');
      return creep;
    }
    return null;
  }
}
