import { BodyPartSet } from '@sergiocabral/screeps';
import { IJob } from './IJob';
import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { ToText } from '../../../Infrastructure/Helper/ToText';

/**
 * Trabalho disponível para ser realizado.
 */
export abstract class JobBase implements IJob {
  /**
   * Constructor
   * @param screepsOperation Responsável por operar o Screeps.
   * @param priority Prioridade em relação a outros serviços.
   * @param name Nome único da vaga.
   */
  public constructor(
    protected readonly screepsOperation: IScreepsOperation,
    public priority: number,
    public readonly name: string
  ) {}

  /**
   * Exige energia para desempenhar o trabalho.
   */
  public abstract get needEnergy(): boolean;

  /**
   * Total de vagas.
   */
  public abstract get count(): number;

  /**
   * Total de vagas alocadas.
   */
  public abstract get allocated(): number;

  /**
   * Quantidade mínima de partes do corpo exigida para o trabalho.
   */
  public abstract get minimumBodyCount(): BodyPartSet;

  /**
   * Percentual mínima de partes do corpo exigida para o trabalho.
   */
  public abstract get optimumBodyPercent(): BodyPartSet;

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
