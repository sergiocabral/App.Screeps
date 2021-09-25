import { InvalidExecutionError } from '@sergiocabral/helper';

export abstract class PreFilter<TPreFilter> {
  /**
   * Ativa/desativa o uso do pré-filtro.
   * Será retornado undefined para preFilterValue se for desativado.
   * @protected
   */
  protected preFilterEnabled = true;

  /**
   * Determina se o pré-filtro foi chamado.
   * @private
   */
  private _preFilterCalled = false;

  /**
   * Valor do pré-filtro definido.
   * @private
   */
  private _preFilterValueValue: TPreFilter = undefined as unknown as TPreFilter;

  /**
   * Valor do pré-filtro definido.
   * @private
   */
  protected get preFilterValue(): TPreFilter {
    if (this.preFilterEnabled && !this._preFilterCalled) {
      throw new InvalidExecutionError(
        'Call preFilter() is mandatory for {0}'.querystring(
          this.constructor.name
        )
      );
    }
    this._preFilterCalled = false;
    const preFilterValueValue = this._preFilterValueValue;
    this._preFilterValueValue = undefined as unknown as TPreFilter;
    return preFilterValueValue;
  }

  /**
   * Define um pré-filtro que determina o conjunto de instâncias disponíveis para consulta.
   * @param preFilter
   * @protected
   */
  public preFilter(preFilter: TPreFilter): this {
    this._preFilterValueValue = preFilter;
    this._preFilterCalled = true;
    return this;
  }
}
