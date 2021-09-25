import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { GetById } from './GetBy/GetById';
import { SourceWrapper } from '../../Wrapper/SourceWrapper';
import { FilterSource } from './Filter/FilterSource';
import { GetByRoom } from './GetBy/GetByRoom';
import { PreFilterSource } from './PreFilter/PreFilterSource';
import { HelperList } from '@sergiocabral/helper';

/**
 * Classe para consultar de entidades: Source
 */
export class QuerySource extends QueryIdOrNameBase<
  Source,
  SourceWrapper,
  FilterSource,
  PreFilterSource | undefined
> {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.memoryEntryForGarbageCollector.push('sources');
    this.preFilterEnabled = true;
  }

  /**
   * Lista de instâncias do Screeps.
   * @protected
   */
  protected override getInstances(
    preFilter: PreFilterSource | undefined
  ): Source[] {
    const findMode = preFilter?.onlyActives
      ? FIND_SOURCES_ACTIVE
      : FIND_SOURCES;
    if (preFilter?.room !== undefined) {
      const room = this.screepsEnvironment.game.rooms[preFilter.room.name];
      return room ? room.find(findMode) : [];
    } else {
      return HelperList.unique(
        Object.values(this.screepsEnvironment.game.spawns)
          .map(spawn => spawn.room.find(findMode))
          .reduce((result, sources) => {
            result.push(...sources);
            return result;
          })
      );
    }
  }

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly createWrapper = SourceWrapper;

  /**
   * Consulta por: nome
   */
  public readonly getByName = new GetById(this);

  /**
   * Consulta por: sala
   */
  public readonly getByRoom = new GetByRoom(this);
}
