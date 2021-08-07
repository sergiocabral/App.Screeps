import { Message } from '@sergiocabral/helper';

/**
 * Comando de console.
 */
export class ReceivedConsoleCommand extends Message {
  /**
   * Construtor.
   * @param command Comando.
   * @param args Argumentos informados.
   */
  public constructor(
    public readonly command: string,
    public readonly args: string[]
  ) {
    super();
  }
}
