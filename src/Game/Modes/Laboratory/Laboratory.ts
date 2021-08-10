import { BaseGame } from '../../../Infrastructure/Core/BaseGame';
import { SpawnWrapper } from '../../../Infrastructure/Screeps/Entity/SpawnWrapper';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class Laboratory extends BaseGame {
  /**
   * Ajuda para os comandos.
   */
  public override help = 'Modo atual do jogo: laboratório de estratégias.';

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    const spawn = this.screepsOperation.query.getSpawns()[0] as SpawnWrapper;
    if (this.screepsOperation.entity.canCreateCreep(spawn)) {
      this.screepsOperation.entity.createCreep(spawn);
    }
  }
}
