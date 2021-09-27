import { JobBase } from './JobBase';
import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { BodyPartSet } from '@sergiocabral/screeps';

/**
 * Upgrade no controller.
 */
export class JobUpgrade extends JobBase {
  /**
   * Constructor
   * @param screepsOperation Responsável por operar o Screeps.
   * @param priority Prioridade em relação a outros serviços.
   */
  public constructor(screepsOperation: IScreepsOperation, priority: number) {
    super(screepsOperation, priority, 'Upgrade');
    if (
      this.screepsOperation.query.controller
        .preFilter({})
        .getAll()
        .find(controller => controller.instance.level === 1)
    ) {
      this.priority = 0;
    }
  }

  /**
   * Exige energia para desempenhar o trabalho.
   */
  public override readonly needEnergy = true;

  /**
   * Total de vagas.
   * Sempre deve ser possível fazer upgrade controller.
   */
  public override readonly count: number = Number.MAX_SAFE_INTEGER;

  /**
   * Total de vagas alocadas.
   */
  public override get allocated(): number {
    return 0;
  }

  /**
   * Quantidade mínima de partes do corpo exigida para o trabalho.
   */
  public override get minimumBodyCount(): BodyPartSet {
    return {
      work: 1,
      move: 1,
      carry: 1
    };
  }

  /**
   * Percentual mínima de partes do corpo exigida para o trabalho.
   */
  public override get optimumBodyPercent(): BodyPartSet {
    return {
      work: 1 / 3,
      move: 1 / 3,
      carry: 1 / 3
    };
  }
}
