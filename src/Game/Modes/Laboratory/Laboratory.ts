import { BaseGame } from '../../../Infrastructure/Core/BaseGame';
import { Logger } from '@sergiocabral/helper';

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
    Logger.post('Not implemented.');
  }
}
