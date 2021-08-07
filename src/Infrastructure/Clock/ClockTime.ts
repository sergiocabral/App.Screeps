import { MemoryHandler } from '../Core/MemoryHandler';
import { ClockTimeData } from './ClockTimeData';
import { Logger, LogLevel } from '@sergiocabral/helper';

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

    this.emmitLog();
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

  /**
   * Emite um log com as informações do click.
   * @private
   */
  private emmitLog(): void {
    if (Math.floor(this.elapsedTime / 1000) % 5 !== 0) return;
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
}
