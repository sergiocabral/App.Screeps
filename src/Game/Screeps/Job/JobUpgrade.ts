import { JobBase } from './JobBase';

/**
 * Upgrade no controller.
 */
export class JobUpgrade extends JobBase {
  /**
   * Verifica se tem trabalho para um creep em uma sala.
   */
  public override isAvailable(room: Room, creep: Creep): boolean {
    creep;
    return (
      this.screepsOperation.query.room
        .getSpawned()
        .filter(roomWrapper => roomWrapper.instance.name === room.name).length >
      0
    );
  }
}
