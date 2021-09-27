import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { ToText } from '../../../Infrastructure/Helper/ToText';
import { JobHarvest } from './JobHarvest';
import { JobTransferEnergyToSpawn } from './JobTransferEnergyToSpawn';
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
    let priority = 0;
    this._offersValue.push(
      new JobTransferEnergyToSpawn(screepsOperation, ++priority)
    );
    this._offersValue.push(new JobUpgrade(screepsOperation, ++priority));
    this._offersValue.push(new JobHarvest(screepsOperation, ++priority));
  }

  /**
   * Lista de trabalhos.
   */
  private _offersValue: IJob[] = [];

  /**
   * Lista de trabalhos.
   */
  public getOffers(): IJob[] {
    return Array<IJob>().concat(this._offersValue);
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
