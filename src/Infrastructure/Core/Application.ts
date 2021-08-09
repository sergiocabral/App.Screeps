import { InvalidExecutionError } from '@sergiocabral/helper';
import { IScreepsOperation } from '../Screeps/IScreepsOperation';
import { Query } from '../Screeps/Query';
import { IScreepsEnvironment } from '../Screeps/IScreepsEnvironment';
import { Console } from '../Console/Console';
import { Definition } from '../Definition';
import { EndExecutionEvent } from './Message/EndExecutionEvent';
import { BeginExecutionEvent } from './Message/BeginExecutionEvent';
import { Scheduler } from '../Schedule/Scheduler';
import { IGame } from './IGame';
import { ClockTime } from '../Schedule/ClockTime';

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
  public static start(gameExecutor: IGame): void {
    if (this.uniqueInstance !== null) {
      throw new InvalidExecutionError(
        'This class can only be instantiated once.'
      );
    }
    this.uniqueInstance = new Application(gameExecutor);
    this.uniqueInstance.run();
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

    this.query = new Query(this);
  }

  /**
   * Momento do início do tempo de execução da aplicação.
   * @private
   */
  private static runtimeStarted = new Date().getTime();

  /**
   * Executa a aplicação.
   */
  public run(): void {
    void new EndExecutionEvent(this).send();
    this.gameExecutor.loop(this);
    void new BeginExecutionEvent(this).send();

    this.clockTime.setCurrentExecutionDuration(
      new Date().getTime() - Application.runtimeStarted
    );
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
  readonly query: Query;
}
