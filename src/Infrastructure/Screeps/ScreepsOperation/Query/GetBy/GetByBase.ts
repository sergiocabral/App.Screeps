import { QueryBase } from '../QueryBase';
import { WrapperBase } from '../../../Entity/WrapperBase';
import { TemplateFilter } from '../Filter/TemplateFilter';

/**
 * Métodos para obter entidade
 */
export abstract class GetByBase<
  TScreeps,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilter
> {
  /**
   * Construtor.
   * @param query Instância da query.
   */
  public constructor(
    protected query: QueryBase<TScreeps, TWrapper, TQueryFilter>
  ) {}
}
