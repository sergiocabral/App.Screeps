import { MemoryHandler } from '../Core/MemoryHandler';
import { InvalidExecutionError, KeyValue, Message } from '@sergiocabral/helper';
import { ScheduleMessage } from './Message/ScheduleMessage';
import { IListOfScheduledMessagesType } from './IListOfScheduledMessagesType';
import { ScheduledMessage } from './Message/ScheduledMessage';
import { EndExecutionEvent } from '../Core/Message/EndExecutionEvent';

/**
 * Agendador de mensagens.
 */
export class Scheduler
  extends MemoryHandler<KeyValue<number>>
  implements IListOfScheduledMessagesType
{
  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(memory: Memory, propertyName: string) {
    super(memory, propertyName, () => {
      return {};
    });
    Message.subscribe(ScheduleMessage, this.handleScheduleMessage.bind(this));
    Message.subscribe(EndExecutionEvent, () => this.dispatchExpiredMessages());
  }

  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   * @private
   */
  private scheduledMessageTypesValue: typeof ScheduledMessage[] = [];

  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  public get scheduledMessageTypes(): typeof ScheduledMessage[] {
    return Array<typeof ScheduledMessage>().concat(
      this.scheduledMessageTypesValue
    );
  }

  /**
   * Carrega uma lista de mensagens do tipo que podem ser agendadas.
   * @param instance Instância que possuem uma lista de mensagens do tipo que podem ser agendadas.
   */
  public loadMessageTypes(instance: IListOfScheduledMessagesType): Scheduler {
    this.scheduledMessageTypesValue.push(...instance.scheduledMessageTypes);
    return this;
  }

  /**
   * Despacha as mensagens agendadas e vencidas.
   * @private
   */
  private dispatchExpiredMessages(): void {
    const currentDate = new Date().getTime();
    for (const messageName in this.source) {
      const messageDate = Number(this.source[messageName]);
      if (messageDate > currentDate) continue;
      delete this.source[messageName];

      const MessageConstructor = this.scheduledMessageTypesValue.find(
        messageType => messageType.name === messageName
      );

      if (MessageConstructor === undefined) {
        throw new InvalidExecutionError(
          'Unknown message type "{messageType}".'.querystring({
            messageType: messageName
          })
        );
      }

      void new MessageConstructor().send();
    }
  }

  /**
   * Mensagem: ScheduleMessage
   * @param message Mensagem a ser agendada.
   * @private
   */
  private handleScheduleMessage(message: ScheduleMessage): void {
    const alreadyScheduled = Boolean(this.source[message.message.name]);
    if (alreadyScheduled && !message.reschedule) return;
    this.source[message.message.name] = message.date.getTime();
  }
}
