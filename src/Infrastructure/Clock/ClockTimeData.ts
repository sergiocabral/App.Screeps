export type ClockTimeData = {
  /**
   * Total de ticks.
   */
  ticks: number;

  /**
   * Momento da primeira execução.
   */
  firstExecution: number;

  /**
   * Momento da última execução antes do momento atual.
   */
  lastExecution: number;
};
