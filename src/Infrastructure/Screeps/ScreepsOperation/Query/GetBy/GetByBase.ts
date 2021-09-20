import { QueryBase } from '../QueryBase';
import { WrapperBase } from '../../../Wrapper/WrapperBase';
import { TemplateFilter } from '../Filter/TemplateFilter';
import { ToText } from '../../../../Helper/ToText';

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

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this, ['query']);
  };
}
