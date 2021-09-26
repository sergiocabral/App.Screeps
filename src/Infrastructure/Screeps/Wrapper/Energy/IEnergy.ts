/**
 * Quantificação de energia.
 */
export interface IEnergy {
  /**
   * Capacidade total de energia.
   */
  get total(): number;

  /**
   * Energia disponível.
   */
  get available(): number;

  /**
   * Energia disponível como percentual.
   */
  get availableAsPercent(): number;

  /**
   * Utilização de energia.
   */
  get used(): number;

  /**
   * Utilização de energia como percentual.
   */
  get usedAsPercent(): number;
}
