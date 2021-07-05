import { JsonWithFunction } from "../Helper/Type/JsonWithFunction";
import { LogContext } from "./LogContext";
import { LogLevel } from "./LogLevel";

/**
 * Mensagem de log.
 */
export interface LogMessage {
  /**
   * Identificador.
   */
  id: number;

  /**
   * Momento do log.
   */
  time: Date;

  /**
   * Nível do log.
   */
  level: LogLevel;

  /**
   * Orígem do log.
   */
  context: LogContext;

  /**
   * Texto.
   */
  message: string;

  /**
   * Template do texto.
   */
  messageTemplate: string;

  /**
   * Valores associados.
   */
  values?: JsonWithFunction;
}
