import { Message } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { BeginExecutionEvent } from '../../../Core/Message/BeginExecutionEvent';
import { SendDebugToConsole } from '../../../Console/Message/SendDebugToConsole';
import { QueryCreep } from './QueryCreep';
import { QuerySpawn } from './QuerySpawn';
import { QueryFlag } from './QueryFlag';
import { ToText } from '../../../Helper/ToText';
import { QueryRoom } from './QueryRoom';
import { QuerySource } from './QuerySource';
import { QueryController } from './QueryController';

/**
 * Consulta informações do jogo.
 */
export class Queries {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(private screepsEnvironment: IScreepsEnvironment) {
    this.creep = new QueryCreep(screepsEnvironment);
    this.spawn = new QuerySpawn(screepsEnvironment);
    this.flag = new QueryFlag(screepsEnvironment);
    this.room = new QueryRoom(screepsEnvironment);
    this.source = new QuerySource(screepsEnvironment);
    this.controller = new QueryController(screepsEnvironment);

    Message.subscribe(BeginExecutionEvent, () => this.sendDebugToConsole());
  }

  /**
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    const section = 'Screeps';
    new SendDebugToConsole(
      () => 'Count, rooms: {0}',
      () => [this.room.getAll().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, controllers: {0}',
      () => [this.controller.preFilter(undefined).getAll().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, spawns: {0}',
      () => [this.spawn.getAll().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, sources: {0}',
      () => [this.source.preFilter(undefined).getAll().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, flags: {0}',
      () => [this.flag.getAll().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, creeps: {0}',
      () => [this.creep.getAll().length],
      section
    ).send();
  }

  /**
   * Retorna uma objeto pelo id e fas o cast.
   * @param id
   */
  public getById<T>(id?: Id<T> | string): T | null | undefined {
    if (id === undefined) return undefined;
    return this.screepsEnvironment.game.getObjectById(id);
  }

  /**
   * Creeps.
   */
  public readonly creep: QueryCreep;

  /**
   * Spawn.
   */
  public readonly spawn: QuerySpawn;

  /**
   * Spawn.
   */
  public readonly flag: QueryFlag;

  /**
   * Room.
   */
  public readonly room: QueryRoom;

  /**
   * Source.
   */
  public readonly source: QuerySource;

  /**
   * Controller
   */
  public readonly controller: QueryController;

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this, ['instances']);
  };
}
