import { Configure } from './Configure';
import { InvalidExecutionError, Logger, LogLevel } from '@sergiocabral/helper';

/**
 * Classe principal da aplicação.
 */
export class Application {
  /**
   * Única instância desta classe.
   * Padrão de projeto Singleton.
   * @private
   */
  private static uniqueInstance: Application | null = null;

  /**
   * Inicia a aplicação.
   */
  public static start(): void {
    if (this.uniqueInstance !== null) {
      throw new InvalidExecutionError(
        'This class can only be instantiated once.'
      );
    }
    this.uniqueInstance = new Application();
    this.uniqueInstance.run();
  }

  /**
   * Construtor.
   */
  constructor() {
    Configure.log();
  }

  /**
   * Executa a aplicação.
   */
  public run(): void {
    Logger.post('Application running.', null, LogLevel.Verbose);
  }
}
