import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperNamedBase } from './WrapperNamedBase';

/**
 * Spawn
 */
export class SpawnWrapper extends WrapperNamedBase<StructureSpawn> {
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
