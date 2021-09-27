import { JobBase } from './JobBase';
import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { BodyPartSet } from '@sergiocabral/screeps';

/**
 * Transferir energia para spawn.
 */
export class JobTransferEnergyToSpawn extends JobBase {
  /**
   * Constructor
   * @param screepsOperation Responsável por operar o Screeps.
   * @param priority Prioridade em relação a outros serviços.
   */
  public constructor(screepsOperation: IScreepsOperation, priority: number) {
    super(screepsOperation, priority, 'TransferEnergyToSpawn');
  }

  /**
   * Exige energia para desempenhar o trabalho.
   */
  public override readonly needEnergy = true;

  /**
   * Total de vagas.
   */
  public override get count(): number {
    return this.screepsOperation.query.spawn
      .getAll()
      .map(spawn => spawn.energy.used)
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
