import { Message } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { BeginExecutionEvent } from '../../../Core/Message/BeginExecutionEvent';
import { SendDebugToConsole } from '../../../Console/Message/SendDebugToConsole';
import { QueryCreep } from './QueryCreep';
import { QuerySpawn } from './QuerySpawn';
import { QueryFlag } from './QueryFlag';
import { ToText } from '../../../Helper/ToText';

/**
 * Consulta informações do jogo.
 */
export class Queries {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(screepsEnvironment: IScreepsEnvironment) {
    this.creep = new QueryCreep(screepsEnvironment);
    this.spawn = new QuerySpawn(screepsEnvironment);
    this.flag = new QueryFlag(screepsEnvironment);

    Message.subscribe(BeginExecutionEvent, () => this.sendDebugToConsole());
  }

  /**
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    const section = 'Screeps';
    new SendDebugToConsole(
      () => 'Count, spawns: {0}',
      () => [this.spawn.getAll().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, creeps: {0}',
      () => [this.creep.getAll().length],
      section
    ).send();
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
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this, ['instances', 'screepsEnvironment']);
  };
}
