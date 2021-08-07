import { InvalidExecutionError, Logger, Message } from '@sergiocabral/helper';
import { ILoop } from './ILoop';
import { IScreepsOperation } from '../Screeps/IScreepsOperation';
import { Query } from '../Screeps/Query';
import { IScreepsEnvironment } from '../Screeps/IScreepsEnvironment';
import { LogWriterToScreeps } from '@sergiocabral/screeps';
import { Console } from '../Console/Console';
import { Definition } from '../Definition';
import { ClockTime } from '../Clock/ClockTime';
import { BeforeGameExecutionEvent } from './Message/BeforeGameExecutionEvent';
import { AfterGameExecutionEvent } from './Message/AfterGameExecutionEvent';
import { ReceivedConsoleCommand } from '../Console/ReceivedConsoleCommand';
import { Scheduler } from '../Clock/Scheduler';

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
  public static start(gameExecutor: ILoop): void {
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
  private constructor(private gameExecutor: ILoop) {
    Logger.defaultLogger = new LogWriterToScreeps();
    void new Console(this.memory, Definition.MemoryConsoleCommand);
    void new Scheduler(this.memory, Definition.MemoryScheduler);
    void new ClockTime(this.memory, Definition.MemoryClockTime);
    this.query = new Query(this);
    Message.subscribe(
      ReceivedConsoleCommand,
      Application.handleReceivedConsoleCommand.bind(this)
    );
  }

  /**
   * Mensagem: ReceivedConsoleCommand
   * @param message
   * @private
   */
  private static handleReceivedConsoleCommand(
    message: ReceivedConsoleCommand
  ): void {
    Logger.post('Comando {command}', message);
  }

  /**
   * Executa a aplicação.
   */
  public run(): void {
    void new BeforeGameExecutionEvent(this).send();
    this.gameExecutor.loop(this);
    void new AfterGameExecutionEvent(this).send();
  }

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
