import { JobBase } from './JobBase';
import { BodyPartSet } from '@sergiocabral/screeps';
import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';

/**
 * Coletar energia.
 */
export class JobHarvest extends JobBase {
  /**
   * Constructor
   * @param screepsOperation Responsável por operar o Screeps.
   * @param priority Prioridade em relação a outros serviços.
   */
  public constructor(
    screepsOperation: IScreepsOperation,
    public override readonly priority: number
  ) {
    super(screepsOperation, priority, 'Harvest');
  }

  /**
   * Exige energia para desempenhar o trabalho.
   */
  public override readonly needEnergy = false;

  /**
   * Total de vagas.
   */
  public override get count(): number {
    return this.screepsOperation.query.source
      .preFilter({ onlyActives: true })
      .getAll()
      .map(source => source.energy.used)
      .reduce((sum, missingEnergy) => sum + missingEnergy);
  }

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
