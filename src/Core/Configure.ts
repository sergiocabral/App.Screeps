import { InvalidExecutionError, Logger } from '@sergiocabral/helper';
import { LogWriterToScreeps } from '../Common/Log/LogWriterToScreeps';

/**
 * Realiza a configuração inicial do programa.
 */
export class Configure {
  /**
   * Construtor.
   */
  constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }

  /**
   * Configuração do log.
   */
  public static log(): void {
    Logger.defaultLogger = new LogWriterToScreeps();
  }
}
