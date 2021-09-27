/**
 * Informações do clock.
 */
export interface ClockTimeData {
  /**
   * Total de ticks.
   */
  tickCount: number;

  /**
   * Data e hora da primeira execução.
   */
  firstExecutionTime: number;

  /**
   * Data e hora da última execução.
   */
  lastExecutionTime: number;

  /**
   * Duração total da aplicação em execução.
   */
  totalExecutionDuration: number;

  /**
   * Duração da última execução da aplicação.
   */
  lastExecutionDuration: number;

  /**
   * Menor tempo de execução da aplicação.
   */
  shorterExecutionDuration: number;

  /**
   * Maior tempo de execução da aplicação.
   */
  longerExecutionDuration: number;
}
