import { BaseWrapper } from './BaseWrapper';
import { IScreepsEnvironment } from '../IScreepsEnvironment';

/**
 * Spawn
 */
export class SpawnWrapper extends BaseWrapper<StructureSpawn> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    instance: StructureSpawn,
    screepsEnvironment: IScreepsEnvironment
  ) {
    super(instance, screepsEnvironment, 'spawn');
  }
}
