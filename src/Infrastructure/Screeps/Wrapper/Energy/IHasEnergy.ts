import { IEnergyInformation } from './IEnergyInformation';

/**
 * Instância com quantificação de energia.
 */
export interface IHasEnergy {
  /**
   * Quantificação de energia.
   */
  get energy(): IEnergyInformation;
}
