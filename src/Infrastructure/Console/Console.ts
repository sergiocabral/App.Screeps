import { ILoop } from '../Core/ILoop';
import { HelperText, KeyValue } from '@sergiocabral/helper';
import { ConsoleCommand } from './ConsoleCommand';

/**
 * Configuração do console como entrada de comandos.
 */
export class Console implements ILoop {
  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(memory: Memory, private readonly propertyName: string) {
    this.source = memory as unknown as KeyValue<string>;
  }

  /**
   * Objeto que servirá de fonte de dados.
   * @private
   */
  private readonly source: KeyValue<string>;

  /**
   * Implementada a lógica do loop do jogo.
   */
  public loop(): void {
    const commandLine = this.source[this.propertyName];
    if (!commandLine) return;
    const args = HelperText.getCommandArguments(commandLine);
    const command = args.shift();
    if (command) {
      void new ConsoleCommand(command, args).send();
    }
    delete this.source[this.propertyName];
  }
}
