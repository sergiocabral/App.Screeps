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
    //TODO: Continuar daqui: Definir unidades de trabalho para os itens abaixo. Depois fazer o creep ingressar em uma oferta de trabalho.
    this._offersValue.push(new JobHarvest(screepsOperation, 1));
    this._offersValue.push(new JobUpgrade(screepsOperation, 2));
    this._offersValue.push(new JobTransferEnergyToSpawn(screepsOperation, 3));
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
