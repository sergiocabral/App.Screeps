import { SpawnWrapper } from '../../../Infrastructure/Screeps/Entity/SpawnWrapper';
import { ModeBase } from '../../ModeBase';

/**
 * Jogo no funcionamento de fazer upgrade do controller.
 */
export class Laboratory extends ModeBase {
  /**
   * Ajuda para os comandos.
   */
  public override help = 'Modo atual do jogo: laboratório de estratégias.';

  /**
   * Executa o loop de fato.
   * @private
   */
  protected override do(): void {
    const spawn = this.screepsOperation.query.spawn.getAll()[0] as SpawnWrapper;
    this.factoryCreep.basicHarvest(spawn);
  }
}
