import { Logger, LogLevel, Message } from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from './ReceivedConsoleCommand';
import { MemoryHandler } from '../Core/MemoryHandler';
import { LogWriterToScreeps } from '@sergiocabral/screeps';
import { ConsoleLoggerData } from './ConsoleLoggerData';

/**
 * Configuração do log para o console.
 */
export class ConsoleLogger extends MemoryHandler<ConsoleLoggerData> {
  /**
   * Nível mínimo de log padrão
   * @private
   */
  private static defaultMinimumLevel: LogLevel = LogLevel.Verbose;

  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(memory: Memory, propertyName: string) {
    super(memory, propertyName, () => {
      return {
        minimumLevel: LogLevel[ConsoleLogger.defaultMinimumLevel] as string
      };
    });
    const minimumLevel =
      ConsoleLogger.toLogLevel(this.source.minimumLevel) ??
      ConsoleLogger.defaultMinimumLevel;

    Logger.defaultLogger = this.logger = new LogWriterToScreeps(minimumLevel);

    Message.subscribe(
      ReceivedConsoleCommand,
      this.handleReceivedConsoleCommand.bind(this)
    );
  }

  /**
   * Logger da aplicação.
   * @private
   */
  public logger: LogWriterToScreeps;

  /**
   * Handler de mensagem ReceivedConsoleCommand
   * @param message
   * @private
   */
  private handleReceivedConsoleCommand(message: ReceivedConsoleCommand): void {
    switch (message.command) {
      case 'log':
        this.configureLog(message.args);
        break;
    }
  }

  /**
   * Converte um texto para LogLevel.
   * @param value
   * @private
   */
  private static toLogLevel(value: unknown): LogLevel | null {
    const valueAsString = String(value);
    const logLevel = LogLevel[
      valueAsString as unknown as number
    ] as unknown as LogLevel;
    return logLevel >= 0 ? logLevel : null;
  }

  /**
   * Configura a exibição do log no console.
   * @param args
   * @private
   */
  private configureLog(args: string[]): void {
    if (args.length === 0) {
      Logger.post(
        'Minimum logging level currently defined: {minimumLevel}',
        {
          minimumLevel: LogLevel[this.logger.minimumLevel]
        },
        LogLevel.Information,
        'ConsoleLogger'
      );
    } else if (args.length === 1) {
      const newMinimumLevelName = args[0];
      const newMinimumLevel = ConsoleLogger.toLogLevel(newMinimumLevelName);

      if (newMinimumLevel !== null) {
        this.logger.minimumLevel = newMinimumLevel;
        this.source.minimumLevel = LogLevel[newMinimumLevel] as string;

        Logger.post(
          'Defined the minimum logging level: {minimumLevel}',
          {
            minimumLevel: LogLevel[this.logger.minimumLevel]
          },
          LogLevel.Information,
          'ConsoleLogger'
        );
      } else {
        Logger.post(
          'Invalid log level: {0}',
          newMinimumLevelName,
          LogLevel.Error,
          'ConsoleLogger'
        );
      }
    } else {
      Logger.post(
        'Expected only zero or one parameter.',
        null,
        LogLevel.Error,
        'ConsoleLogger'
      );
    }
  }
}
