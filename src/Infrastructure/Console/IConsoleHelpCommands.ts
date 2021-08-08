/**
 * Representação das informações de ajuda para comandos de console.
 */
export interface IConsoleHelpCommands {
  /**
   * Ajuda para os comandos.
   */
  get help(): string[] | string;
}
