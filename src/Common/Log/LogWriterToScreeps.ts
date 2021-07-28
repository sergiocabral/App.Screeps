import { LogWriterToConsole } from '@sergiocabral/helper';

/**
 * Escritor de log para o Screeps.
 */
export class LogWriterToScreeps extends LogWriterToConsole {
  public override getConsoleFunction(
    functionName: 'error' | 'warn' | 'info' | 'log' | 'debug'
  ): (message: string) => void {
    functionName;
    return console.log;
  }
}
