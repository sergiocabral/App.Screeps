import { ConsoleLogger } from "./ConsoleLogger";
import { JsonWithFunction } from "../Helper/Type/JsonWithFunction";
import { LogContext } from "./LogContext";
import { LogLevel } from "./LogLevel";
import { LogMessage } from "./LogMessage";

/**
 * Classe global estática para emitir mensagens de log.
 */
export class Logger {
  /**
   * Nível mínimo de log para exibição.
   */
  public static minimumLevel: LogLevel = LogLevel.Verbose;

  /**
   * Registra uma mensagem de log
   * @param text Função que monta o texto.
   * @param values Opcional. Conjunto de valores para substituição na string.
   * @param level Nível do log.
   * @param context Origem do log.
   */
  public static post(
    text: string | (() => string),
    values?: JsonWithFunction,
    level: LogLevel = LogLevel.Debug,
    context: LogContext = LogContext.General
  ): void {
    if (level < this.minimumLevel) return;

    if (typeof text === "function") {
      text = text();
    }

    for (const value in values) {
      if (Object.prototype.hasOwnProperty.call(values, value)) {
        const fnc = values[value];
        if (fnc instanceof Function) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          values[value] = fnc();
        }
      }
    }

    const message = this.factoryMessage(text, values, level, context);

    this.writeToConsole(message);
  }

  /**
   * Contador de mensagens.
   * @private
   */
  private static messageCount = 0;

  /**
   * Monta um objeto de mensagem de log.
   * @param text Texto da mensagem.
   * @param values Conjunto de valores relacionados.
   * @param level Nível da mensagem.
   * @param context Orígem do log. Nome do módulo ou arquivo.
   */
  private static factoryMessage(
    text: string,
    values: JsonWithFunction | undefined = undefined,
    level: LogLevel,
    context: LogContext
  ): LogMessage {
    const message = text.querystring(values);

    return {
      id: ++this.messageCount,
      time: new Date(),
      level,
      message,
      messageTemplate: text,
      context,
      values
    };
  }

  /**
   * Escreve a mensagem no console.
   * @param message Mensagem.
   */
  private static writeToConsole(message: LogMessage): void {
    ConsoleLogger.write(message);
  }
}
