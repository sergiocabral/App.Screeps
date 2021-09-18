/**
 * Gerencia lista de chave e valor.
 */
export class KeyValueManager {
  /**
   * Construtor.
   * @param dataset Base original.
   * @param onChanged Evento disparado quando ocorre alguma alteração
   */
  public constructor(
    public readonly dataset: Record<string, unknown> = {},
    private onChanged?: () => void
  ) {
    this.dataset = JSON.parse(JSON.stringify(dataset)) as Record<
      string,
      unknown
    >;
  }

  /**
   * Verifica se a chave existe.
   * @param keys
   */
  public has(...keys: string[]): boolean {
    for (const key of keys) {
      if (this.dataset[key] !== undefined) return true;
    }
    return false;
  }

  /**
   * Verifica se uma propriedade tem um valor definido.
   * @param keyValue
   * @param equals Testa a igualdade entre dois valores.
   */
  public match(
    keyValue: [string, unknown[]],
    equals: (a: unknown, b: unknown) => boolean = (a: unknown, b: unknown) =>
      a == b
  ): boolean {
    const key = keyValue[0];
    const values = keyValue[1];
    const existentValue = this.dataset[key];
    if (existentValue !== undefined) {
      for (const value of values) {
        if (equals(existentValue, value)) return true;
      }
    }
    return false;
  }

  /**
   * Define uma chave e valor.
   * @param key
   * @param value
   */
  public set<TType = string>(key: string, value: TType): void {
    if (
      value === undefined ||
      value === null ||
      !(value as unknown as boolean)
    ) {
      this.remove(key);
    } else {
      this.dataset[key] = value;
      if (this.onChanged) this.onChanged();
    }
  }

  /**
   * Retorna um valor de uma chave chave.
   * @param key
   */
  public get<TType = string>(key: string): TType | undefined {
    const value = this.dataset[key];
    if (value !== undefined) {
      return value as TType;
    } else {
      return undefined;
    }
  }

  /**
   * Remove uma chave.
   * @param key
   */
  public remove(key: string): void {
    delete this.dataset[key];
    if (this.onChanged) this.onChanged();
  }

  /**
   * Remove todas as chaves
   */
  public clear(): void {
    const initialCount = Object.keys(this.dataset).length;
    for (const key in this.dataset) {
      delete this.dataset[key];
    }
    if (initialCount > 0 && this.onChanged) this.onChanged();
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return Object.keys(this.dataset).join(', ');
  };
}
