import { JobBase } from './JobBase';

/**
 * Transferir energia para spawn.
 */
export class JobTransferEnergy extends JobBase {
  /**
   * Verifica se tem trabalho para um creep em uma sala.
   */
  public override isAvailable(room: Room, creep: Creep): boolean {
    creep;
    return (
      this.screepsOperation.query.spawn.getByRoom
        .with(room)
        .filter(spawn => spawn.availableEnergy < 1).length > 0
    );
  }
}
