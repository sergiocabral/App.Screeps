import { QueryIdOrNameBase } from './QueryIdOrNameBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { GetById } from './GetBy/GetById';
import { GetByRoom } from './GetBy/GetByRoom';
import { HelperList } from '@sergiocabral/helper';
import { ControllerWrapper } from '../../Wrapper/ControllerWrapper';
import { FilterController } from './Filter/FilterController';
import { PreFilterController } from './PreFilter/PreFilterController';

/**
 * Classe para consultar de entidades: Controller
 */
export class QueryController extends QueryIdOrNameBase<
  StructureController,
  ControllerWrapper,
  FilterController,
  PreFilterController | undefined
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
    preFilter: PreFilterController | undefined
  ): StructureController[] {
    if (preFilter?.room !== undefined) {
      const room = this.screepsEnvironment.game.rooms[preFilter.room.name];
      return room?.controller ? [room.controller] : [];
    } else {
      return HelperList.unique(
        Object.values(this.screepsEnvironment.game.spawns)
          .map(spawn => spawn.room.controller)
          .reduce((result, controller) => {
            if (controller) result.push(controller);
            return result;
          }, Array<StructureController>())
      );
    }
  }

  /**
   * Construtor para o wrapper.
   * @protected
   */
  protected override readonly createWrapper = ControllerWrapper;

  /**
   * Consulta por: nome
   */
  public readonly getByName = new GetById(this);

  /**
   * Consulta por: sala
   */
  public readonly getByRoom = new GetByRoom(this);
}
