import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { CreepWrapper } from '../../../Infrastructure/Screeps/Wrapper/CreepWrapper';
import { BodyPartSet } from '@sergiocabral/screeps';
import { CreepRole } from './CreepRole';
import {
  HelperObject,
  InvalidArgumentError,
  Logger,
  LogLevel
} from '@sergiocabral/helper';
import { CreepRoleBodySet } from './CreepRoleBodySet';
import { ToText } from '../../../Infrastructure/Helper/ToText';

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
   * @param creeps
   */
  public redefine(...creeps: CreepWrapper[]): void {
    if (creeps.length === 0) {
      Logger.post(
        'There are no creeps to be redefined.',
        undefined,
        LogLevel.Debug,
        FactoryCreep.LoggerSection
      );
      return;
    }

    Logger.post(
      'A total of {count} creeps will be redefined.',
      {
        count: creeps.length
      },
      LogLevel.Information,
      FactoryCreep.LoggerSection
    );

    for (const creep of creeps) {
      Logger.post(
        'The "{creep}" creep will have its current roles ({roles}) and properties ({properties}) redefined.',
        {
          creep: creep.instance.name,
          roles: HelperObject.toText(creep.roles.list),
          properties: HelperObject.toText(creep.properties.dataset)
        },
        LogLevel.Verbose,
        FactoryCreep.LoggerSection
      );

      let redefined = false;
      for (const roleBodySet of this._roleBodySet) {
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
            { creep: creep.instance.name, roles: creep.roles },
            LogLevel.Debug,
            FactoryCreep.LoggerSection
          );
        } else {
          Logger.post(
            'The "{creep}" creep had its properties erased but already had its roles updated: {roles}',
            { creep: creep.instance.name, roles: creep.roles },
            LogLevel.Debug,
            FactoryCreep.LoggerSection
          );
        }
        redefined = true;
      }

      if (!redefined) {
        creep.properties.clear();
        creep.roles.clear();

        Logger.post(
          'The parameterization of "{creep}" creep was not recognized. No role has been defined.',
          { creep },
          LogLevel.Warning,
          FactoryCreep.LoggerSection
        );
      }
    }
  }

  /**
   * Cria um creep.
   * @param spawn
   * @param role
   */
  public create(spawn: StructureSpawn, role: CreepRole): CreepWrapper | null {
    for (const roleBodySet of this._roleBodySet) {
      if (roleBodySet.roles.includes(role)) {
        return this._createCreep(
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
  private _createCreep(
    spawn: StructureSpawn,
    bodyPartSet: BodyPartSet,
    ...roles: CreepRole[]
  ): CreepWrapper | null {
    if (this.screepsOperation.control.creep.canCreate(spawn, bodyPartSet)) {
      const creep = this.screepsOperation.control.creep.create(
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
  private readonly _roleBodySet: CreepRoleBodySet[] = [
    {
      roles: [CreepRole.BasicHarvest],
      bodyParts: {
        carry: 1,
        work: 1,
        move: 1
      }
    }
  ];

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
