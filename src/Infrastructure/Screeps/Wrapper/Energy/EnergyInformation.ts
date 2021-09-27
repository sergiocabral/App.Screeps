import { IEnergyInformation } from './IEnergyInformation';
import { ToText } from '../../../Helper/ToText';

/**
 * Quantificação de energia.
 */
export class EnergyInformation implements IEnergyInformation {
  /**
   * Construtor.
   * @param _calculateTotal Usada para calcular o total.
   * @param _calculateUsed Usada para calcular o uso.
   */
  public constructor(
    private readonly _calculateTotal: number | (() => number),
    private readonly _calculateUsed: number | (() => number)
  ) {}

  /**
   * Capacidade total de energia.
   */
  public get total(): number {
    return typeof this._calculateTotal === 'number'
      ? this._calculateTotal
      : this._calculateTotal();
  }

  /**
   * Energia disponível.
   */
  public get available(): number {
    return this.total - this.used;
  }

  /**
   * Energia disponível como percentual.
   */
  public get availableAsPercent(): number {
    return this.available / this.total;
  }

  /**
   * Utilização de energia.
   */
  public get used(): number {
    return typeof this._calculateUsed === 'number'
      ? this._calculateUsed
      : this._calculateUsed();
  }

  /**
   * Utilização de energia como percentual.
   */
  public get usedAsPercent(): number {
    return this.used / this.total;
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this, []);
  };
}
