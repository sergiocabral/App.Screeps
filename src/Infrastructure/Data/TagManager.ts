/**
 * Tipo de função usada para comparar duas tags.
 */
type EqualsFunction = (a: unknown, b: unknown) => boolean;

/**
 * Gerencia uma lista de tags.
 */
export class TagManager<TType> {
  /**
   * Construtor.
   * @param equals Função para estabelecer igualdade.
   */
  public constructor(equals?: EqualsFunction) {
    this.equals =
      equals ?? ((a: unknown, b: unknown) => String(a) === String(b));
  }

  /**
   * Função para estabelecer igualdade.
   * @private
   */
  private equals: EqualsFunction;

  /**
   * Lista original de tags
   * @private
   */
  private readonly tags: TType[] = [];

  /**
   * Verifica a posição de uma tag na lista.
   * @param tag
   */
  private index(tag: TType): number {
    return this.tags.findIndex(existentTag => this.equals(tag, existentTag));
  }

  /**
   * Lista de tags.
   */
  public get list(): TType[] {
    return Array<TType>().concat(this.tags);
  }

  /**
   * Verifica se a tag existe.
   * @param tag
   */
  public has(tag: TType): boolean {
    return this.index(tag) >= 0;
  }

  /**
   * Adiciona uma tag.
   * @param tag
   */
  public add(tag: TType): boolean {
    if (!this.has(tag)) {
      this.tags.push(tag);
      return true;
    }
    return false;
  }

  /**
   * Adiciona uma tag.
   * @param tag
   */
  public remove(tag: TType): boolean {
    const index = this.index(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      return true;
    }
    return false;
  }
}
