import { MemoryHandler } from '../Core/MemoryHandler';
import { ClockTimeData } from './ClockTimeData';
import {
  InvalidExecutionError,
  Logger,
  LogLevel,
  Message
} from '@sergiocabral/helper';
import { SendDebugToConsole } from '../Console/Message/SendDebugToConsole';
import { BeginExecutionEvent } from '../Core/Message/BeginExecutionEvent';
import { ClearStatisticsMessage } from './Message/ClearStatisticsMessage';

/**
 * Informações do momento (time) de execução.
 */
export class ClockTime
  extends MemoryHandler<ClockTimeData>
  implements ClockTimeData
{
  /**
   * Contexto para log.
   * @private
   */
  private static readonly loggerContext = 'ClockTime';

  /**
   * Construtor.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(propertyName: string) {
    super(propertyName, () => {
      return {
        tickCount: 0,
        firstExecutionTime: 0,
        lastExecutionTime: 0,
        totalExecutionDuration: 0,
        lastExecutionDuration: 0,
        shorterExecutionDuration: 0,
        longerExecutionDuration: 0
      };
    });
    this.source.tickCount++;

    if (
      this.source.firstExecutionTime === 0 ||
      this.source.lastExecutionTime === 0
    ) {
      this.source.firstExecutionTime = this.source.lastExecutionTime =
        this.currentTime;
    }

    this.lastExecutionTime = this.source.lastExecutionTime;
    this.source.lastExecutionTime = this.currentTime;

    Message.subscribe(BeginExecutionEvent, () => this.sendDebugToConsole());
    Message.subscribe(ClearStatisticsMessage, () => this.clearStatistics());
  }

  /**
   * Data e hora atual.
   */
  public readonly currentTime: number = new Date().getTime();

  /**
   * Total de ticks.
   */
  public get tickCount(): number {
    return this.source.tickCount;
  }

  /**
   * Tempo médio da duração do tick.
   */
  public get averageTickDuration(): number {
    const average =
      (this.lastExecutionTime - this.firstExecutionTime) / this.tickCount;
    return Number.isFinite(average) ? average : 0;
  }

  /**
   * Data e hora da primeira execução.
   */
  public get firstExecutionTime(): number {
    return this.source.firstExecutionTime;
  }

  /**
   * Data e hora da última execução.
   */
  public readonly lastExecutionTime: number;

  /**
   * Duração total da aplicação em execução.
   */
  public get totalExecutionDuration(): number {
    return this.source.totalExecutionDuration;
  }

  /**
   * Duração da última execução da aplicação.
   */
  public get lastExecutionDuration(): number {
    return this.source.lastExecutionDuration;
  }

  /**
   * Menor tempo de execução da aplicação.
   */
  public get shorterExecutionDuration(): number {
    return this.source.shorterExecutionDuration;
  }

  /**
   * Menor tempo de execução da aplicação.
   */
  public get longerExecutionDuration(): number {
    return this.source.longerExecutionDuration;
  }

  /**
   * Duração média de cada execução da aplicação.
   */
  public get averageExecutionDuration(): number {
    return this.totalExecutionDuration / this.tickCount;
  }

  /**
   * Tempo total da aplicação no ar.
   */
  public get applicationUptime(): number {
    return this.currentTime - this.firstExecutionTime;
  }

  /**
   * Sinaliza se runtimeElapsed já foi definido.
   * @private
   */
  private runtimeElapsedAlreadyDefined = false;

  /**
   * Atualiza as informações relacionadas a duração do tempo de execução atual.
   * @param currentExecutionDuration Em milissegundos.
   */
  public setCurrentExecutionDuration(currentExecutionDuration: number): void {
    if (this.runtimeElapsedAlreadyDefined) {
      throw new InvalidExecutionError(
        'setRuntimeElapsed() cannot be called more than once.'
      );
    }
    this.runtimeElapsedAlreadyDefined = true;
    this.source.totalExecutionDuration += currentExecutionDuration;
    this.source.lastExecutionDuration = currentExecutionDuration;
    if (
      this.shorterExecutionDuration === 0 ||
      currentExecutionDuration < this.shorterExecutionDuration
    ) {
      this.source.shorterExecutionDuration = currentExecutionDuration;
    }
    if (
      this.longerExecutionDuration === 0 ||
      currentExecutionDuration > this.longerExecutionDuration
    ) {
      this.source.longerExecutionDuration = currentExecutionDuration;
    }
  }

  /**
   * Limpa as estatísticas de execução.
   */
  public clearStatistics(): void {
    this.source.shorterExecutionDuration = 0;
    this.source.longerExecutionDuration = 0;
    Logger.post(
      'Shorter and longer execution duration was cleared.',
      undefined,
      LogLevel.Information,
      ClockTime.loggerContext
    );
  }

  /**
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    const section = 'Clock';
    new SendDebugToConsole(
      () => 'Tick, count: {0}',
      () => [this.tickCount.format({ digits: 0 })],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Tick, average duration: {0}',
      () => [(this.averageTickDuration / 1000).format({ suffix: ' seconds' })],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Execution, last duration: {0}',
      () => [
        this.lastExecutionDuration.format({
          digits: 0,
          suffix: ' milliseconds'
        })
      ],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Execution, average duration: {0}',
      () => [this.averageExecutionDuration.format({ suffix: ' milliseconds' })],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Execution, total duration: {0}',
      () => [new Date(this.totalExecutionDuration).format({ mask: 'running' })],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Execution statistics, shorter duration: {0}',
      () => [
        this.shorterExecutionDuration.format({
          digits: 0,
          suffix: ' milliseconds'
        })
      ],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Execution statistics, longer duration: {0}',
      () => [
        this.longerExecutionDuration.format({
          digits: 0,
          suffix: ' milliseconds'
        })
      ],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Application, started: {0}',
      () => [new Date(this.firstExecutionTime).format({ mask: 'universal' })],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Application, Uptime: {0}',
      () => [new Date(this.applicationUptime).format({ mask: 'running' })],
      section
    ).send();
  }
}
