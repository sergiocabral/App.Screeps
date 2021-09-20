import { HelperObject, InvalidExecutionError } from '@sergiocabral/helper';

/**
 * Utilitários de formatação.
 */
export class ToText {
  /**
   * Construtor.
   */
  public constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }

  /**
   * Exibe a representação texto de uma instância.
   * @param instance Instância.
   * @param exclude Exclui propriedades
   * @param only Exibe apenas essas propriedades.
   */
  public static instance(
    instance: unknown,
    exclude: string[] = [],
    only: string[] = []
  ): string {
    exclude.push('screepsEnvironment');
    exclude.push('sendDebugToConsole');
    const filter = (name: string): boolean => {
      return (
        !exclude.includes(name) && (only.length === 0 || only.includes(name))
      );
    };
    return HelperObject.describe(instance, true, true, filter);
  }
}
