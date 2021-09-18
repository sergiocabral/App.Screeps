import { WrapperBase } from './WrapperBase';
import { IScreepsEnvironment } from '../IScreepsEnvironment';

/**
 * Spawn
 */
export class SpawnWrapper extends WrapperBase<StructureSpawn> {
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
