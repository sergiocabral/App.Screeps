import { WrapperBase } from './WrapperBase';
import { IScreepsEnvironment } from '../IScreepsEnvironment';

/**
 * Creep
 */
export class CreepWrapper extends WrapperBase<Creep> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(instance: Creep, screepsEnvironment: IScreepsEnvironment) {
    super(instance, screepsEnvironment, 'creeps');
  }
}
