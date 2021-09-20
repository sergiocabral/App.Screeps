import { WrapperBase } from '../../../Entity/WrapperBase';

export interface IFilterMatch<
  TScreeps,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter
> {
  /**
   * Verifica o filtro.
   * @param entity
   * @param filter
   * @private
   */
  fail(entity: TWrapper, filter: TQueryFilter): boolean;
}
