import { InvalidExecutionError, Message } from '@sergiocabral/helper';

/**
 * Mensagem que pode ser agendada.
 */
export class ScheduledMessage extends Message {
  public constructor() {
    super();
    if (this.constructor.name === ScheduledMessage.name) {
      throw new InvalidExecutionError(
        'This class cannot be directly instantiated.'
      );
    }
  }
}
