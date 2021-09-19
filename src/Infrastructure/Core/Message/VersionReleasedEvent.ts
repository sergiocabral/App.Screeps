import { Message } from '@sergiocabral/helper';

/**
 * Quando uma nova versão é publicada.
 */
export class VersionReleasedEvent extends Message {
  /**
   * Construtor.
   * @param major Versão
   * @param build Número do build.
   * @param stamp Estampa do build.
   * @param elapsedTime Tempo decorrido desde a última atualização.
   */
  public constructor(
    public readonly major: number,
    public readonly build: number,
    public readonly stamp: string,
    public readonly elapsedTime: number
  ) {
    super();
  }
}
