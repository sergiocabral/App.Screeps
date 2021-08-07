import { Message } from '@sergiocabral/helper';

/**
 * Agendador de mensagens.
 */
export class ScheduleMessage extends Message {
  /**
   * Construtor.
   * @param message Mensagem a ser agendada.
   * @param date Data da execução.
   */
  public constructor(public message: typeof Message, public date: Date) {
    super();
  }
}
