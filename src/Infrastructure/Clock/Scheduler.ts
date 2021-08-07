import { MemoryHandler } from '../Core/MemoryHandler';
import { KeyValue, Message } from '@sergiocabral/helper';
import { ScheduleMessage } from './Message/ScheduleMessage';
import { BeforeGameExecutionEvent } from '../Core/Message/BeforeGameExecutionEvent';
import { ClockTimeEmmitLogCommand } from './Message/ClockTimeEmmitLogCommand';

/**
 * Agendador de mensagens.
 */
export class Scheduler extends MemoryHandler<KeyValue<number>> {
  /**
   * Lista de todas as mensagens para que possam ser instanciadas por agendamento.
   * @private
   */
  private static allMessages: Array<typeof ClockTimeEmmitLogCommand> = [
    ClockTimeEmmitLogCommand
  ];

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
    Message.subscribe(
      BeforeGameExecutionEvent,
      this.handleBeforeGameExecutionEvent.bind(this)
    );
  }

  /**
   * Handler de mensagem BeforeGameExecutionEvent
   * @private
   */
  private handleBeforeGameExecutionEvent(): void {
    const currentDate = new Date().getTime();
    for (const messageName in this.source) {
      const messageDate = Number(this.source[messageName]);
      if (messageDate > currentDate) continue;
      const messageConstructor = Scheduler.allMessages.find(
        messageType => messageType.name === messageName
      );
      if (messageConstructor) {
        void new messageConstructor().send();
      }
      delete this.source[messageName];
    }
  }

  /**
   * Mensagem: ScheduleMessage
   * @param message Mensagem a ser agendada.
   * @param reschedule Reagendar caso já esteja agendado.
   * @private
   */
  private handleScheduleMessage(
    message: ScheduleMessage,
    reschedule = false
  ): void {
    const alreadyScheduled = Boolean(this.source[message.message.name]);
    if (alreadyScheduled && !reschedule) return;
    this.source[message.message.name] = message.date.getTime();
  }
}
