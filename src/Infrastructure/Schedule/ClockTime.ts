import { MemoryHandler } from '../Core/MemoryHandler';
import { ClockTimeData } from './ClockTimeData';
import { Message } from '@sergiocabral/helper';
import { SendDebugToConsole } from '../Console/Message/SendDebugToConsole';
import { EndExecutionEvent } from '../Core/Message/EndExecutionEvent';

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

    Message.subscribe(EndExecutionEvent, () => this.sendDebugToConsole());
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
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    const section = 'Clock';
    new SendDebugToConsole(
      () => 'Ticks: {ticks}',
      () => {
        return {
          ticks: this.ticks
        };
      },
      section
    ).send();
    new SendDebugToConsole(
      () => 'Average tick time: {averageTickTime}',
      () => {
        return {
          averageTickTime: ClockTime.formatTime(this.averageTickTime, 'seconds')
        };
      },
      section
    ).send();
    new SendDebugToConsole(
      () => 'Uptime: {uptime}',
      () => {
        return {
          uptime: ClockTime.formatTime(this.elapsedTime, 'minutes')
        };
      },
      section
    ).send();
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
