import { Message } from '@sergiocabral/helper';

/**
 * Agenda uma mensagem.
 */
export class ScheduleMessage extends Message {
  /**
   * Construtor.
   * @param message Mensagem a ser agendada.
   * @param date Data da execução.
   * @param reschedule Reagendar caso já esteja agendado.
   */
  public constructor(
    public message: typeof Message,
    public date: Date,
    public reschedule = false
  ) {
    super();
  }
}
