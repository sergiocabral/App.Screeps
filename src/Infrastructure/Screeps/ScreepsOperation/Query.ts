import { Message } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { BeginExecutionEvent } from '../../Core/Message/BeginExecutionEvent';
import { SendDebugToConsole } from '../../Console/Message/SendDebugToConsole';
import { QueryCreep } from './QueryCreep';
import { QuerySpawn } from './QuerySpawn';

/**
 * Consulta informações do jogo.
 */
export class Query {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(screepsEnvironment: IScreepsEnvironment) {
    this.creep = new QueryCreep(screepsEnvironment);
    this.spawn = new QuerySpawn(screepsEnvironment);

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
      () => [this.spawn.list().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, creeps: {0}',
      () => [this.creep.list().length],
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
}
