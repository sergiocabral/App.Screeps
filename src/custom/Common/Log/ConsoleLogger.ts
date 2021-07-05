import { LogContext } from "./LogContext";
import { LogLevel } from "./LogLevel";
import { LogMessage } from "./LogMessage";

/**
 * Registra log no console.
 */
export class ConsoleLogger {
  /**
   * Nível mínimo de log para exibição.
   */
  public static minimumLevel: LogLevel = LogLevel.Verbose;

  /**
   * Escreve a mensagem no console.
   * @param message Mensagem.²³¹
   */
  public static write(message: LogMessage): void {
    if (message.level < this.minimumLevel) return;

    const level = LogLevel[message.level];
    const context = message.context === LogContext.General ? "" : ": " + LogContext[message.context];
    const text = `${message.time.toLocaleString()} [${level + context}] ${message.message}`;

    let log;
    switch (message.level) {
      case LogLevel.Error:
      case LogLevel.Warning:
      case LogLevel.Information:
      case LogLevel.Debug:
      default:
        log = console.log;
        break;
    }

    log(text);
  }
}
