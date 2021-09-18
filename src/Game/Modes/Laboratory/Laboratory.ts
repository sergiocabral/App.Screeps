import { BaseGame } from '../../../Infrastructure/Core/BaseGame';
import { SpawnWrapper } from '../../../Infrastructure/Screeps/Entity/SpawnWrapper';
import { BodyPartSet } from '@sergiocabral/screeps';

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
    const bodyParts: BodyPartSet = {
      move: 1,
      work: 1,
      carry: 1
    };
    if (this.screepsOperation.entity.creep.canCreate(spawn, bodyParts)) {
      this.screepsOperation.entity.creep.create(spawn, bodyParts);
    }
  }
}
