import { MemoryHandler } from '../Core/MemoryHandler';
import { ClockTimeData } from './ClockTimeData';
import { HelperDate, Logger, LogLevel, Message } from '@sergiocabral/helper';
import { BeforeGameExecutionEvent } from '../Core/Message/BeforeGameExecutionEvent';
import { ScheduleMessage } from './Message/ScheduleMessage';
import { ClockTimeEmmitLogCommand } from './Message/ClockTimeEmmitLogCommand';

/**
 * Informações do momento (time) de execução.
 */
export class ClockTime extends MemoryHandler<ClockTimeData> {
  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(memory: Memory, propertyName: string) {
    super(memory, propertyName, () => {
      return {
        ticks: 0,
        first: 0,
        last: 0
      };
    });

    this.currentExecution = new Date().getTime();

    this.lastExecution =
      this.source.last > 0 ? this.source.last : this.currentExecution;

    this.source.last = this.currentExecution;

    this.ticks = ++this.source.ticks;

    if (this.source.first <= 0) {
      this.source.first = this.currentExecution;
    }
    this.firstExecution = this.source.first;

    this.elapsedTime = this.currentExecution - this.firstExecution;

    Message.subscribe(
      BeforeGameExecutionEvent,
      this.handleBeforeGameExecutionEvent.bind(this)
    );
    Message.subscribe(
      ClockTimeEmmitLogCommand,
      this.handleClockTimeEmmitLogCommand.bind(this)
    );
  }

  /**
   * Handler de mensagem BeforeGameExecutionEvent
   * @private
   */
  private handleBeforeGameExecutionEvent(): void {
    void new ScheduleMessage(
      ClockTimeEmmitLogCommand,
      HelperDate.addSeconds(30)
    ).send();
  }

  /**
   * Handler de mensagem ClockTimeEmmitLogCommand
   * @private
   */
  private handleClockTimeEmmitLogCommand(): void {
    Logger.post(
      [
        'Ticks {ticks}.',
        'Uptime: {uptime}.',
        'Average tick time: {averageTickTime}.',
        'Data source: Memory.{propertyName}'
      ].join(' '),
      () => {
        return {
          ticks: this.ticks,
          uptime: ClockTime.formatTime(this.elapsedTime, 'minutes'),
          averageTickTime: ClockTime.formatTime(
            this.averageTickTime,
            'seconds'
          ),
          propertyName: this.propertyName
        };
      },
      LogLevel.Verbose,
      'ClockTime'
    );
  }

  /**
   * Total de ticks.
   */
  public readonly ticks: number;

  /**
   * Momento da primeira execução.
   */
  public readonly firstExecution: number;

  /**
   * Momento da última execução antes do momento atual.
   */
  public readonly lastExecution: number;

  /**
   * Momento da execução atual.
   */
  public readonly currentExecution: number;

  /**
   * Tempo total decorrido do jogo.
   */
  public readonly elapsedTime: number;

  /**
   * Tempo total decorrido do jogo: em segundos
   */
  public get elapsedSeconds(): number {
    return Math.floor(this.elapsedTime / 1000);
  }

  /**
   * Tempo total decorrido do jogo: em minutos
   */
  public get elapsedMinutes(): number {
    return Math.floor(this.elapsedTime / 1000 / 60);
  }

  /**
   * Tempo total decorrido do jogo: em horas
   */
  public get elapsedHours(): number {
    return Math.floor(this.elapsedTime / 1000 / 60 / 60);
  }

  /**
   * Tempo total decorrido do jogo: em dias
   */
  public get elapsedDays(): number {
    return Math.floor(this.elapsedTime / 1000 / 60 / 60 / 24);
  }

  /**
   * Tempo médio do tick
   */
  public get averageTickTime(): number {
    const average = (this.lastExecution - this.firstExecution) / this.ticks;
    return Number.isFinite(average) ? average : 0;
  }

  /**
   * Formata a exibição de milissegundos.
   * @param milliseconds Tempo decorrido.
   * @param output Unidade .
   */
  private static formatTime(
    milliseconds: number,
    output: 'seconds' | 'minutes'
  ): string {
    let time = milliseconds / 1000;
    if (output === 'minutes') {
      time /= 60;
      return `${Math.round(time)} ${output}`;
    } else {
      return `${time.toFixed(1)} ${output}`;
    }
  }
}
