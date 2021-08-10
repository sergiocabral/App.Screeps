import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { CreepWrapper } from '../Entity/CreepWrapper';
import { SpawnWrapper } from '../Entity/SpawnWrapper';
import { NameGenerator } from '@sergiocabral/screeps';
import { Logger, LogLevel } from '@sergiocabral/helper';
import { Constant } from '../../../Helper/Constant';
import { Query } from './Query';

/**
 * Entidades do jogo.
 */
export class Entity {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   * @param query Consulta informações do jogo
   */
  constructor(
    private screepsEnvironment: IScreepsEnvironment,
    private query: Query
  ) {}

  /**
   * Determina se um Spawn pode criar um Creep.
   * @param spawn
   * @param bodyParts
   */
  canCreateCreep(
    spawn: SpawnWrapper,
    bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE]
  ): boolean {
    const spawnEnergy = spawn.instance.store[RESOURCE_ENERGY];
    return (
      this.query.calculateCost(bodyParts) <= spawnEnergy &&
      spawn.instance.spawning === null
    );
  }

  /**
   * Inicia a criação de um Creep a partir de um Spawn.
   * @param spawn
   * @param bodyParts
   */
  createCreep(
    spawn: SpawnWrapper,
    bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE]
  ): CreepWrapper | null {
    const creepName = NameGenerator.firstAndLastName;
    const statusCode = spawn.instance.spawnCreep(bodyParts, creepName);

    if (statusCode !== OK) {
      Logger.post(
        'Spawn "{spawnName}" could not create a creep. Error code: {statusCode}',
        {
          spawnName: spawn.instance.name,
          statusCode: Constant.format(statusCode)
        },
        LogLevel.Error
      );
      return null;
    }
    const creep = this.screepsEnvironment.game.creeps[creepName];
    if (!creep) {
      Logger.post(
        'Spawn "{spawnName}" created the creep "{creepName}", but the creep was not found.',
        {
          creepName,
          spawnName: spawn.instance.name
        },
        LogLevel.Error
      );
      return null;
    }

    const creepWrapper = new CreepWrapper(creep, this.screepsEnvironment);

    Logger.post(
      'Spawn "{spawnName}" created the creep "{creepName}". JSON: {json}',
      {
        creepName,
        spawnName: spawn.instance.name,
        json: JSON.stringify(creep, undefined, 2)
      },
      LogLevel.Verbose
    );

    return creepWrapper;
  }
}
