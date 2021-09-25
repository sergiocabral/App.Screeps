import { JobBase } from './JobBase';

/**
 * Coletar energia.
 */
export class JobHarvest extends JobBase {
  /**
   * Verifica se tem trabalho para um creep em uma sala.
   */
  public override isAvailable(room: Room, creep: Creep): boolean {
    creep;
    return (
      this.screepsOperation.query.source
        .preFilter({ room: room, onlyActives: true })
        .getAll().length > 0
    );
  }
}
