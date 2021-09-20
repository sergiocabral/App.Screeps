import { InvalidExecutionError } from '@sergiocabral/helper';

//TODO: Extrair para npm.
//TODO: exibir métodos com parâmetros.

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
   * Lista métodos de um objetos
   * @param instance
   * @private
   */
  private static getAllKeys(instance: unknown): string[] {
    const properties = new Set<string>();
    let current = instance as Record<string, unknown>;
    do {
      Object.getOwnPropertyNames(current).map(item => properties.add(item));
    } while (
      (current = Object.getPrototypeOf(current) as Record<string, unknown>)
    );
    return Array.from(properties);
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
    const instanceAsObject = instance as Record<string, unknown>;
    const className = instanceAsObject.constructor.name;
    const exemptKeys = ['toString', 'sendDebugToConsole'].concat(
      exclude,
      this.getAllKeys({})
    );
    const keys = this.getAllKeys(instanceAsObject)
      .filter(
        key =>
          (only.length === 0 || only.includes(key)) && !exemptKeys.includes(key)
      )
      .sort();
    const properties = keys.filter(
      key => typeof instanceAsObject[key] !== 'function'
    );
    const methods = keys.filter(
      key => typeof instanceAsObject[key] === 'function'
    );

    const lines = Array<string>();
    lines.push(className);
    if (properties.length) lines.push('Properties: ' + properties.join(', '));
    if (methods.length) lines.push('Methods: ' + methods.join(', '));
    return lines.join('\n');
  }
}
