import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperNamedBase } from './WrapperNamedBase';

/**
 * Creep
 */
export class CreepWrapper extends WrapperNamedBase<Creep> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(instance: Creep, screepsEnvironment: IScreepsEnvironment) {
    super(instance, screepsEnvironment, 'creeps');
  }
}
