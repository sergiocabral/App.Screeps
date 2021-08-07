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
};
