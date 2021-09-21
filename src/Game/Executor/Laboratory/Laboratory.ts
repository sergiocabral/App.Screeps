import { GameExecutor } from '../../Core/GameExecutor';
import { CreepRole } from '../../Screeps/Creep/CreepRole';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class Laboratory extends GameExecutor {
  /**
   * Descrição do modo do jogo.
   */
  protected override readonly description = 'Laboratório de estratégias.';

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    const rooms = this.screepsOperation.query.room.getSpawned();
    for (const room of rooms) {
      const spawns = this.screepsOperation.query.spawn.getByRoom.with(
        room.instance
      );
      for (const spawn of spawns) {
        this.factoryCreep.create(spawn.instance, CreepRole.BasicHarvest);
        //TODO: Continuar aqui
      }
    }
  }
}
