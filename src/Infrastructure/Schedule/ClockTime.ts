import { MemoryHandler } from '../Core/MemoryHandler';
import { ClockTimeData } from './ClockTimeData';
import { InvalidExecutionError, Message } from '@sergiocabral/helper';
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
        last: 0,
        runtime: 0,
        lastRuntime: 0
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

    this.runtime = this.source.runtime;
    this.lastRuntime = this.source.lastRuntime;

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
   * Tempo global de execução da aplicação.
   */
  public readonly runtime: number;

  /**
   * Tempo da última execução da aplicação.
   */
  public readonly lastRuntime: number;

  /**
   * Tempo médio de cada execução da aplicação.
   */
  public get averageRuntime(): number {
    return Math.floor(this.runtime / this.ticks);
  }

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
   * Sinaliza se runtimeElapsed já foi definido.
   * @private
   */
  private runtimeElapsedAlreadyDefined = false;

  /**
   * Atualiza as informações relacionadas a duração do tempo de execução.
   * @private
   */
  public setRuntimeElapsed(value: number): void {
    if (this.runtimeElapsedAlreadyDefined) {
      throw new InvalidExecutionError(
        'setRuntimeElapsed() cannot be called more than once.'
      );
    }
    this.runtimeElapsedAlreadyDefined = true;
    this.source.runtime += value;
    this.source.lastRuntime = value;
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
      () => 'Last runtime elapsed: {lastRuntime}',
      () => {
        return {
          lastRuntime: `${this.lastRuntime} milliseconds`
        };
      },
      section
    ).send();
    new SendDebugToConsole(
      () => 'Average runtime elapsed: {averageRuntime}',
      () => {
        return {
          averageRuntime: `${this.averageRuntime} milliseconds`
        };
      },
      section
    ).send();
    new SendDebugToConsole(
      () => 'Global runtime elapsed: {runtime}',
      () => {
        return {
          runtime: ClockTime.formatTime(this.runtime, 'seconds')
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
