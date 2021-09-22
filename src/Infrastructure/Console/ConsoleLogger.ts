import { Logger, LogLevel, Message } from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from './Message/ReceivedConsoleCommand';
import { MemoryHandler } from '../Core/MemoryHandler';
import { LogWriterToScreeps } from '@sergiocabral/screeps';
import { ConsoleLoggerData } from './ConsoleLoggerData';
import { BeginExecutionEvent } from '../Core/Message/BeginExecutionEvent';
import { SendDebugToConsole } from './Message/SendDebugToConsole';

/**
 * Configuração do log para o console.
 */
export class ConsoleLogger extends MemoryHandler<ConsoleLoggerData> {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'Logger';

  /**
   * Nível mínimo de log padrão
   * @private
   */
  private static defaultMinimumLevel: LogLevel = LogLevel.Verbose;

  /**
   * Construtor.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(propertyName: string) {
    super(propertyName, () => {
      return {
        minimumLevel: LogLevel[ConsoleLogger.defaultMinimumLevel] as string
      };
    });
    const minimumLevel =
      ConsoleLogger.toLogLevel(this.source.minimumLevel) ??
      ConsoleLogger.defaultMinimumLevel;

    Logger.defaultLogger = this.logger = new LogWriterToScreeps(minimumLevel);

    Message.subscribe(BeginExecutionEvent, () => this.sendDebugToConsole());

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
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    new SendDebugToConsole(
      () => 'Minimum log level to show: {0}',
      () => LogLevel[this.logger.minimumLevel],
      ConsoleLogger.LoggerSection
    ).send();
  }

  /**
   * Handler de mensagem ReceivedConsoleCommand
   * @param message
   * @private
   */
  private handleReceivedConsoleCommand(message: ReceivedConsoleCommand): void {
    switch (message.command) {
      case 'log':
        if (message.args.length <= 1) {
          this.configureLog(message.args[0]);
          message.processed = true;
        }
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
   * @param minimumLevelName Nome do nível de log.
   * @private
   */
  private configureLog(minimumLevelName?: string): void {
    if (minimumLevelName) {
      const minimumLevel = ConsoleLogger.toLogLevel(minimumLevelName);

      if (minimumLevel !== null) {
        this.logger.minimumLevel = minimumLevel;
        this.source.minimumLevel = LogLevel[minimumLevel] as string;

        Logger.post(
          'Defined the minimum logging level: {minimumLevel}',
          {
            minimumLevel: LogLevel[this.logger.minimumLevel]
          },
          LogLevel.Information,
          ConsoleLogger.LoggerSection
        );
      } else {
        Logger.post(
          'Invalid log level: {0}',
          minimumLevelName,
          LogLevel.Error,
          ConsoleLogger.LoggerSection
        );
      }
    } else {
      Logger.post(
        'Minimum logging level currently defined: {minimumLevel}',
        {
          minimumLevel: LogLevel[this.logger.minimumLevel]
        },
        LogLevel.Information,
        ConsoleLogger.LoggerSection
      );
    }
  }
}
