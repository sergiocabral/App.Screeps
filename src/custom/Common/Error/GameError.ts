import { JsonWithFunction } from "../Helper/Type/JsonWithFunction";
import { LogLevel } from "../Log/LogLevel";
import { Logger } from "../Log/Logger";

/**
 * Classe que representa um erro do jogo.
 */
export class GameError extends Error {
  /**
   * Construtor.
   * @param message Mensagem de erro como template string.
   * @param values Opcional. Conjunto de valores para substituição na string.
   */
  public constructor(message: string, values?: JsonWithFunction) {
    super();
    Logger.post(
      `${message} — Stacktrace {stacktrace}`,
      Object.assign({}, values, { stacktrace: this.stack }),
      LogLevel.Error
    );
  }
}
