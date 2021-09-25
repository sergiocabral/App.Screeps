import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { IJob } from './IJob';

/**
 * Trabalho disponível para ser realizado.
 */
export abstract class JobBase implements IJob {
  /**
   * Construtor.
   * @param screepsOperation
   */
  public constructor(protected readonly screepsOperation: IScreepsOperation) {}

  /**
   * Verifica se tem trabalho para um creep em uma sala.
   */
  public abstract isAvailable(room: Room, creep: Creep): boolean;
}
