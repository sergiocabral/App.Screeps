import { Message } from '@sergiocabral/helper';

/**
 * Recebe mensagens para ser exibidas no console como informações de debug.
 */
export class SendDebugToConsole extends Message {
  /**
   * Construtor.
   * @param messageTemplate Template de mensagem
   * @param values Valores de substituição no template
   * @param section Seção, ou contexto, relacionado.
   */
  public constructor(
    public messageTemplate: () => string,
    public values?: () => unknown,
    public section?: string
  ) {
    super();
  }
}
