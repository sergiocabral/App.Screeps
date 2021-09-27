/**
 * Quantificação de energia.
 */
import { IEnergy } from './IEnergy';
import { ToText } from '../../../Helper/ToText';

export class Energy implements IEnergy {
  /**
   * Construtor.
   * @param calculateTotal Usada para calcular o total.
   * @param calculateUsed Usada para calcular o uso.
   */
  public constructor(
    private readonly calculateTotal: () => number,
    private readonly calculateUsed: () => number
  ) {}

  /**
   * Capacidade total de energia.
   */
  public get total(): number {
    return this.calculateTotal();
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
    return this.calculateUsed();
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
