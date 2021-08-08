export type ClockTimeData = {
  /**
   * Total de ticks.
   */
  ticks: number;

  /**
   * Momento da primeira execução.
   */
  first: number;

  /**
   * Momento da última execução antes do momento atual.
   */
  last: number;

  /**
   * Tempo global de execução da aplicação.
   */
  runtime: number;

  /**
   * Tempo da última execução da aplicação.
   */
  lastRuntime: number;
};
