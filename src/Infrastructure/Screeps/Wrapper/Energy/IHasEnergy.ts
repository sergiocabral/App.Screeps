import { IEnergy } from './IEnergy';

/**
 * Instância com quantificação de energia.
 */
export interface IHasEnergy {
  /**
   * Quantificação de energia.
   */
  get energy(): IEnergy;
}
