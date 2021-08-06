import { InvalidExecutionError, Logger, Message } from '@sergiocabral/helper';
import { ILoop } from './ILoop';
import { IScreepsOperation } from '../Screeps/IScreepsOperation';
import { Query } from '../Screeps/Query';
import { IScreepsEnvironment } from '../Screeps/IScreepsEnvironment';
import { LogWriterToScreeps } from '@sergiocabral/screeps';
import { Console } from '../Console/Console';
import { ConsoleCommand } from '../Console/ConsoleCommand';

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
    this.console = new Console(this.memory, '_');

    this.query = new Query(this);

    Message.subscribe(ConsoleCommand, this.handleConsoleCommand.bind(this));
  }

  /**
   * Ao receber um comando do console.
   * @param message ConsoleCommand
   * @private
   */
  private handleConsoleCommand(message: ConsoleCommand): void {
    Logger.post(
      'Command received "{commandName}" with arguments: {commandArguments}',
      {
        commandName: message.command,
        commandArguments: message.args.join(', ')
      }
    );
  }

  /**
   * Executa a aplicação.
   */
  public run(): void {
    this.console.loop();
    this.gameExecutor.loop(this);
  }

  /**
   * Configuração do console como entrada de comandos.
   * @private
   */
  private readonly console: Console;

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
