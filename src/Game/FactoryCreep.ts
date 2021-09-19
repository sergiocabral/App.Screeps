import { IScreepsOperation } from '../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { CreepWrapper } from '../Infrastructure/Screeps/Entity/CreepWrapper';
import { SpawnWrapper } from '../Infrastructure/Screeps/Entity/SpawnWrapper';
import { BodyPartSet } from '@sergiocabral/screeps';
import { CreepRole } from './CreepRole';
import { InvalidArgumentError } from '@sergiocabral/helper';

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
   * Cria um creep.
   * @param spawn
   * @param role
   */
  public create(spawn: SpawnWrapper, role: CreepRole): CreepWrapper | null {
    switch (role) {
      case CreepRole.Harvest:
      case CreepRole.Upgrader:
      case CreepRole.Builder:
        return this.basicMoveCarryWork(spawn);
    }
    throw new InvalidArgumentError('Unknown role to create a creep.');
  }

  /**
   * Cria um creep.
   * @param spawn
   * @param bodyPartSet
   * @param roles
   * @private
   */
  private createCreep(
    spawn: SpawnWrapper,
    bodyPartSet: BodyPartSet,
    ...roles: CreepRole[]
  ): CreepWrapper | null {
    if (this.screepsOperation.entity.creep.canCreate(spawn, bodyPartSet)) {
      const creep = this.screepsOperation.entity.creep.create(
        spawn,
        bodyPartSet
      );
      creep?.roles.add(...roles);
      return creep;
    }
    return null;
  }

  /**
   * Unidade de creep básica
   * @param spawn
   */
  private basicMoveCarryWork(spawn: SpawnWrapper): CreepWrapper | null {
    return this.createCreep(
      spawn,
      {
        move: 1,
        work: 1,
        carry: 1
      },
      CreepRole.Harvest,
      CreepRole.Upgrader
    );
  }
}
