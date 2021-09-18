import { InvalidExecutionError } from '@sergiocabral/helper';
import { IScreepsOperation } from '../Screeps/ScreepsOperation/IScreepsOperation';
import { Query } from '../Screeps/ScreepsOperation/Query/Query';
import { IScreepsEnvironment } from '../Screeps/IScreepsEnvironment';
import { Console } from '../Console/Console';
import { Definition } from '../Definition';
import { BeginExecutionEvent } from './Message/BeginExecutionEvent';
import { EndExecutionEvent } from './Message/EndExecutionEvent';
import { Scheduler } from '../Schedule/Scheduler';
import { IGame } from './IGame';
import { ClockTime } from '../Schedule/ClockTime';
import { Entity } from '../Screeps/ScreepsOperation/Entity/Entity';
import { GarbageCollector } from '../Screeps/ScreepsOperation/GarbageCollector';
import { ConsoleCommandHandler } from '../Screeps/ConsoleCommandHandler';

/**
 * Classe principal da aplicação.
 */
export class Application implements IScreepsOperation, IScreepsEnvironment {
  /**
   * Única instância desta classe.
   * Padrão de projeto Singleton.
   * @private
   */
  private static uniqueInstance: Application | null = null;

  /**
   * Inicia a aplicação.
   * @param gameExecutor Modo operacional do jogo.
   */
  public static start(gameExecutor: IGame): Application {
    if (this.uniqueInstance !== null) {
      throw new InvalidExecutionError(
        'This class can only be instantiated once.'
      );
    }
    this.uniqueInstance = new Application(gameExecutor);
    return this.uniqueInstance.run();
  }

  /**
   * Construtor.
   * @param gameExecutor Modo operacional do jogo.
   */
  private constructor(private gameExecutor: IGame) {
    void new Console(this.memory, Definition.MemoryConsoleCommand)
      .addConsoleHelpCommands(Definition.ConsoleHelpCommand)
      .addConsoleHelpCommands(gameExecutor);

    this.clockTime = new ClockTime(this.memory, Definition.MemoryClockTime);

    new Scheduler(this.memory, Definition.MemoryScheduler)
      .loadMessageTypes(Definition.ListOfScheduledMessagesType)
      .loadMessageTypes(gameExecutor);

    void new ConsoleCommandHandler();

    this.query = new Query(this);
    this.entity = new Entity(this);
    this.garbageCollector = new GarbageCollector(this.memory);
  }

  /**
   * Momento do início do tempo de execução da aplicação.
   * @private
   */
  private static executionStarted = new Date().getTime();

  /**
   * Executa a aplicação.
   */
  public run(): Application {
    void new BeginExecutionEvent(this).send();
    this.gameExecutor.loop(this);
    void new EndExecutionEvent(this).send();
    this.garbageCollector.recycle();

    this.clockTime.setCurrentExecutionDuration(
      new Date().getTime() - Application.executionStarted
    );

    return this;
  }

  /**
   * Informações do momento (time) de execução.
   * @private
   */
  private readonly clockTime: ClockTime;

  /**
   * Objeto principal do jogo.
   */
  public readonly game: Game = Game;

  /**
   * Objeto para armazenar estados entre os loops.
   */
  public readonly memory: Memory = Memory;

  /**
   * Formas de encontrar caminhos pelo jogo.
   */
  public readonly pathFinder: PathFinder = PathFinder;

  /**
   * Forma de implementar um stringify personalizado.
   */
  public readonly rawMemory: RawMemory = RawMemory;

  /**
   * Consulta informações do jogo.
   */
  public readonly query: Query;

  /**
   * Entidades do jogo.
   */
  public readonly entity: Entity;

  /**
   * Responsável por limpar o lixo da memoria
   */
  public readonly garbageCollector: GarbageCollector;
}
