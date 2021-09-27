import { BodyPartSet } from '@sergiocabral/screeps';

/**
 * Trabalho disponível para ser realizado.
 */
export interface IJob {
  /**
   * Nome único da vaga.
   */
  get name(): string;

  /**
   * Exige energia para desempenhar o trabalho.
   */
  get needEnergy(): boolean;

  /**
   * Total de vagas.
   */
  get count(): number;

  /**
   * Total de vagas alocadas.
   */
  get allocated(): number;

  /**
   * Prioridade em relação a outros serviços.
   */
  get priority(): number;

  /**
   * Quantidade mínima de partes do corpo exigida para o trabalho.
   */
  get minimumBodyCount(): BodyPartSet;

  /**
   * Percentual mínima de partes do corpo exigida para o trabalho.
   */
  get optimumBodyPercent(): BodyPartSet;
}
