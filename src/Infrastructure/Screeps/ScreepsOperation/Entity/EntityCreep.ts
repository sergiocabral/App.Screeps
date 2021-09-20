import { CreepWrapper } from '../../Wrapper/CreepWrapper';
import {
  BodyPart,
  BodyPartSet,
  Constant,
  NameGenerator
} from '@sergiocabral/screeps';
import { HelperObject, Logger, LogLevel } from '@sergiocabral/helper';
import { EntityBase } from './EntityBase';

/**
 * Entidades do jogo: Creep
 */
export class EntityCreep extends EntityBase {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'EntityCreep';

  /**
   * Determina se um Spawn pode criar um Creep.
   * @param spawn
   * @param bodyParts
   */
  canCreate(spawn: StructureSpawn, bodyParts: BodyPartSet): boolean {
    const spawnEnergy = spawn.store[RESOURCE_ENERGY];
    return (
      BodyPart.calculateCost(BodyPart.toPartList(bodyParts)) <= spawnEnergy &&
      spawn.spawning === null
    );
  }

  /**
   * Inicia a criação de um Creep a partir de um Spawn.
   * @param spawn
   * @param bodyParts
   */
  create(spawn: StructureSpawn, bodyParts: BodyPartSet): CreepWrapper | null {
    const creepName = NameGenerator.random();
    const statusCode = spawn.spawnCreep(
      BodyPart.toPartList(bodyParts),
      creepName
    );

    if (statusCode !== OK) {
      Logger.post(
        'Spawn "{spawnName}" could not create a creep. Error code: {statusCode}',
        {
          spawnName: spawn.name,
          statusCode: Constant.format(statusCode)
        },
        LogLevel.Error,
        EntityCreep.LoggerSection
      );
      return null;
    }
    const creep = this.screepsEnvironment.game.creeps[creepName];
    if (!creep) {
      Logger.post(
        'Spawn "{spawnName}" created the creep "{creepName}", but the creep was not found.',
        {
          creepName,
          spawnName: spawn.name
        },
        LogLevel.Critical,
        EntityCreep.LoggerSection
      );
      return null;
    }

    const creepWrapper = new CreepWrapper(creep, this.screepsEnvironment);

    Logger.post(
      'Properties of new Creep "{creepName}": {json}',
      () => {
        return {
          creepName,
          spawnName: spawn.name,
          json: HelperObject.toText(creep)
        };
      },
      LogLevel.Verbose,
      EntityCreep.LoggerSection
    );

    Logger.post(
      'Spawn "{spawnName}" created the Creep "{creepName}".',
      {
        creepName,
        spawnName: spawn.name
      },
      LogLevel.Debug,
      EntityCreep.LoggerSection
    );

    return creepWrapper;
  }
}
