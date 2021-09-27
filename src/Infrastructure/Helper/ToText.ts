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
    const regexExclude: RegExp[] = [
      /initialize/,
      /screepsEnvironment/,
      /screepsOperation/,
      /sendDebugToConsole/,
      /scheduledMessageTypes/,
      /loggerSection/i,
      /^handle/,
      /^_/
    ];
    const filter = (name: string): boolean => {
      return (
        !exclude.includes(name) &&
        (only.length === 0 || only.includes(name)) &&
        !regexExclude.find(regex => regex.test(name))
      );
    };
    const deep = true;
    const includeObjectMembers = false;
    return HelperObject.describe(instance, deep, includeObjectMembers, filter);
  }
}
