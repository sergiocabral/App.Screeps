import {
  HelperDate,
  InvalidExecutionError,
  Message
} from '@sergiocabral/helper';
import { IScreepsOperation } from '../Screeps/ScreepsOperation/IScreepsOperation';
import { Queries } from '../Screeps/ScreepsOperation/Query/Queries';
import { IScreepsEnvironment } from '../Screeps/IScreepsEnvironment';
import { Console } from '../Console/Console';
import { Definition } from '../Definition';
import { BeginExecutionEvent } from './Message/BeginExecutionEvent';
import { EndExecutionEvent } from './Message/EndExecutionEvent';
import { Scheduler } from '../Schedule/Scheduler';
import { IGame } from './IGame';
import { ClockTime } from '../Schedule/ClockTime';
import { Controls } from '../Screeps/ScreepsOperation/Control/Controls';
import { DisposeMissingObject } from '../Screeps/ScreepsOperation/DisposeMissingObject';
import { ConsoleCommandHandler } from '../Screeps/ConsoleCommandHandler';
import { VersionManager } from './VersionManager';
import { ToText } from '../Helper/ToText';
import { ScheduleMessage } from '../Schedule/Message/ScheduleMessage';
import { RunGarbageCollector } from './Message/RunGarbageCollector';

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
   * @param executor Modo operacional do jogo.
   */
  private constructor(private executor: IGame) {
    void new VersionManager(Definition.MemoryVersionManager);

    void new Console(Definition.MemoryConsoleCommand)
      .addConsoleHelpCommands(Definition.ConsoleHelpCommand)
      .addConsoleHelpCommands(executor);

    this.clockTime = new ClockTime(Definition.MemoryClockTime);

    new Scheduler(Definition.MemoryScheduler)
      .loadMessageTypes(Definition.ListOfScheduledMessagesType)
      .loadMessageTypes(executor);

    void new ConsoleCommandHandler(this);
    void new DisposeMissingObject(this.memory);

    this.query = new Queries(this);
    this.control = new Controls(this);

    Message.subscribe(
      EndExecutionEvent,
      Application.handleEndExecutionEvent.bind(this)
    );
  }

  /**
   * Mensagem: EndExecutionEvent
   * @private
   */
  private static handleEndExecutionEvent() {
    new ScheduleMessage(
      RunGarbageCollector,
      HelperDate.addMinutes(Definition.IntervalInMinutesToGarbageCollector)
    ).send();
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
    void new BeginExecutionEvent().send();
    this.executor.loop(this);
    void new EndExecutionEvent().send();

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
  public readonly query: Queries;

  /**
   * Entidades do jogo.
   */
  public readonly control: Controls;

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this, [], ['query', 'control', 'executor']);
  };
}
