/**
 * Manipulador das constantes do jogo.
 */
export class Constant {
  /**
   * Retorna o nome de uma constante de jogo.
   * @param value Valor da constante.
   */
  public static getName(value: unknown): string {
    for (const globalKey in global) {
      if ((global as unknown as Record<string, unknown>)[globalKey] === value) {
        return globalKey;
      }
    }
    return String(value);
  }

  /**
   * Formata a exibição de uma constante do jogo.
   * @param value
   */
  public static format(value: unknown): string {
    const name = this.getName(value);
    return name === String(value) ? name : `${String(value)}, ${name}`;
  }
}
