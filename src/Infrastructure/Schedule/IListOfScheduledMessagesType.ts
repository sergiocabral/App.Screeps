import { ScheduledMessage } from './Message/ScheduledMessage';

/**
 * Disponibiliza uma lista de de mensagens do tipo que podem ser agendadas.
 */
export interface IListOfScheduledMessagesType {
  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  get scheduledMessageTypes(): typeof ScheduledMessage[];
}
