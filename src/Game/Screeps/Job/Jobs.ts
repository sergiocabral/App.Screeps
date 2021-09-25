import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { ToText } from '../../../Infrastructure/Helper/ToText';
import { JobHarvest } from './JobHarvest';
import { JobTransferEnergy } from './JobTransferEnergy';
import { JobUpgrade } from './JobUpgrade';
import { IJob } from './IJob';

/**
 * Ofertas de serviços.
 */
export class Jobs {
  /**
   * Construtor.
   * @param screepsOperation
   */
  public constructor(screepsOperation: IScreepsOperation) {
    this._offersValue.push(new JobHarvest(screepsOperation));
    this._offersValue.push(new JobUpgrade(screepsOperation));
    this._offersValue.push(new JobTransferEnergy(screepsOperation));
  }

  /**
   * Lista de trabalhos.
   */
  private _offersValue: IJob[] = [];

  /**
   * Lista de trabalhos.
   */
  public getAll(): IJob[] {
    return Array<IJob>().concat(this._offersValue);
  }

  /**
   * Lista de trabalhos com ofertas disponíveis.
   */
  public getAvailable(room: Room, creep: Creep): IJob[] {
    return this.getAll().filter(job => job.isAvailable(room, creep));
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
