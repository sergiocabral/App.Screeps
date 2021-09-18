import { BaseWrapper } from './BaseWrapper';

/**
 * Creep
 */
export class CreepWrapper extends BaseWrapper<Creep> {
  /**
   * Nome da propriedade do objeto Memory.
   * @protected
   */
  protected override readonly instanceMemoryEntry = 'creeps';
}
