import { GetByBase } from './GetByBase';
import { WithRoom } from '../../../../Type/WithRoom';
import { WrapperBase } from '../../../Entity/WrapperBase';
import { TemplateFilterWithRoom } from '../Filter/TemplateFilterWithRoom';

/**
 * Métodos para obter entidade: por sala
 */
export class GetByRoom<
  TScreeps extends WithRoom,
  TWrapper extends WrapperBase<TScreeps>,
  TQueryFilter extends TemplateFilterWithRoom
> extends GetByBase<TScreeps, TWrapper, TQueryFilter> {
  /**
   * Localiza uma entidade que possui uma ou mais salas.
   */
  public with(...rooms: Room[]): TWrapper[] {
    return this.query.filter({
      withRoom: rooms
    } as TQueryFilter);
  }

  /**
   * Localiza uma entidade que não possui uma ou mais salas.
   */
  public without(...rooms: Room[]): TWrapper[] {
    return this.query.filter({
      withoutRoom: rooms
    } as TQueryFilter);
  }
}
