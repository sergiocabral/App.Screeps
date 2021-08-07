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
        firstExecution: 0,
        lastExecution: 0
      };
    });

    this.currentExecution = new Date().getTime();

    this.lastExecution =
      this.source.lastExecution > 0
        ? this.source.lastExecution
        : this.currentExecution;

    this.source.lastExecution = this.currentExecution;

    this.ticks = ++this.source.ticks;

    if (this.source.firstExecution <= 0) {
      this.source.firstExecution = this.currentExecution;
    }
    this.firstExecution = this.source.firstExecution;

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
   * Informações do tempo de execução sem interrupção.
   */
  public get uptime(): string {
    const minutes = Math.round(this.elapsedTime / 1000 / 60);
    return `${minutes} minutes`;
  }

  /**
   * Emite um log com as informações do click.
   * @private
   */
  private emmitLog(): void {
    Logger.post(
      'Ticks {ticks}. Uptime: {uptime}. See more in Memory.{propertyName}',
      () => {
        return {
          ticks: this.ticks,
          uptime: this.uptime,
          propertyName: this.propertyName
        };
      },
      LogLevel.Verbose,
      'ClockTime'
    );
  }
}
