import { BaseWrapper } from './BaseWrapper';

/**
 * Spawn
 */
export class SpawnWrapper extends BaseWrapper<StructureSpawn> {
  /**
   * Nome da propriedade do objeto Memory.
   * @protected
   */
  protected override readonly instanceMemoryEntry = 'spawn';
}
