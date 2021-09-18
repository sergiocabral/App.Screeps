/**
 * Gerencia uma lista de tags.
 */
export class TagManager<TType = string> {
  /**
   * Construtor.
   * @param onChanged Evento disparado quando ocorre alguma alteração
   * @param equals Função para estabelecer igualdade.
   */
  public constructor(
    private onChanged?: () => void,
    equals?: (a: TType, b: TType) => boolean
  ) {
    this.equals =
      equals ?? ((a: unknown, b: unknown) => String(a) === String(b));
  }

  /**
   * Função para estabelecer igualdade.
   * @private
   */
  private equals: (a: TType, b: TType) => boolean;

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
   * @param tags
   */
  public add(...tags: TType[]): void {
    for (const tag of tags) {
      if (!this.has(tag)) {
        this.tags.push(tag);
        if (this.onChanged) this.onChanged();
      }
    }
  }

  /**
   * Adiciona uma tag.
   * @param tags
   */
  public remove(...tags: TType[]): void {
    for (const tag of tags) {
      const index = this.index(tag);
      if (index >= 0) {
        this.tags.splice(index, 1);
        if (this.onChanged) this.onChanged();
      }
    }
  }

  /**
   * Remove todas as tags
   */
  public clear(): void {
    if (this.tags.length > 0) {
      this.tags.length = 0;
      if (this.onChanged) this.onChanged();
    }
  }
}
