import { IScreepsOperation } from '../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { CreepWrapper } from '../Infrastructure/Screeps/Entity/CreepWrapper';
import { SpawnWrapper } from '../Infrastructure/Screeps/Entity/SpawnWrapper';
import { BodyPartSet } from '@sergiocabral/screeps';
import { CreepRole } from './CreepRole';
import { InvalidArgumentError, Logger, LogLevel } from '@sergiocabral/helper';
import { CreepRoleBodySet } from './CreepRoleBodySet';

/**
 * Constrói instâncias de creeps;
 */
export class FactoryCreep {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'FactoryCreep';

  /**
   * Construtor.
   * @param screepsOperation
   */
  public constructor(private readonly screepsOperation: IScreepsOperation) {}

  /**
   * Redefine as informações de um creep.
   * @param creep
   */
  public redefine(creep: CreepWrapper): boolean {
    for (const roleBodySet of this.roleBodySet) {
      const bodyParts = Object.entries(roleBodySet.bodyParts);
      const bodyPartsCount = bodyParts.reduce(
        (sum: number, bodyPart: [string, number]) => sum + bodyPart[1],
        0
      );
      if (creep.instance.body.length !== bodyPartsCount) continue;
      let exit = false;
      for (const bodyPart of bodyParts) {
        const bodyPartName = bodyPart[0];
        const bodyPartQuantity = bodyPart[1];
        exit =
          creep.instance.body.filter(body => body.type === bodyPartName)
            .length !== bodyPartQuantity;
        if (exit) break;
      }
      if (exit) continue;

      creep.properties.clear();
      if (creep.roles.list.join() !== roleBodySet.roles.join()) {
        creep.roles.clear();
        creep.roles.add(...roleBodySet.roles);
        Logger.post(
          'The "{creep}" creep had its properties erased and roles updated: {roles}',
          { creep, roles: creep.roles },
          LogLevel.Information,
          FactoryCreep.LoggerSection
        );
      } else {
        Logger.post(
          'The "{creep}" creep had its properties erased but already had its roles updated: {roles}',
          { creep, roles: creep.roles },
          LogLevel.Information,
          FactoryCreep.LoggerSection
        );
      }
      return true;
    }

    creep.properties.clear();
    creep.roles.clear();

    Logger.post(
      'The parameterization of "{creep}" creep was not recognized. No role has been defined.',
      { creep },
      LogLevel.Warning,
      FactoryCreep.LoggerSection
    );

    return false;
  }

  /**
   * Cria um creep.
   * @param spawn
   * @param role
   */
  public create(spawn: SpawnWrapper, role: CreepRole): CreepWrapper | null {
    for (const roleBodySet of this.roleBodySet) {
      if (roleBodySet.roles.includes(role)) {
        return this.createCreep(
          spawn,
          roleBodySet.bodyParts,
          ...roleBodySet.roles
        );
      }
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
   * Relação de roles e partes do corpo do creep.
   * @private
   */
  private readonly roleBodySet: CreepRoleBodySet[] = [
    {
      roles: [
        CreepRole.BasicHarvest,
        CreepRole.BasicUpgrader,
        CreepRole.BasicBuilder
      ],
      bodyParts: {
        move: 1,
        work: 1,
        carry: 1
      }
    }
  ];
}
