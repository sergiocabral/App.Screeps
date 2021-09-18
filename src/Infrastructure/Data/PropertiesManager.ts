/**
 * Gerencia propriedades.
 */
export class PropertiesManager {
  /**
   * Lista original de propriedades.
   * @private
   */
  private readonly properties: Record<string, unknown> = {};

  /**
   * Verifica se a propriedade existe.
   * @param properties
   */
  public has(...properties: string[]): boolean {
    for (const property of properties) {
      if (this.properties[property] !== undefined) return true;
    }
    return false;
  }

  /**
   * Define uma propriedade.
   * @param property
   * @param value
   */
  public set<TType = string>(property: string, value: TType): void {
    if (value === undefined || value === null) {
      this.remove(property);
    } else {
      this.properties[property] = value;
    }
  }

  /**
   * Remove uma propriedade.
   * @param property
   */
  public remove(property: string): void {
    delete this.properties[property];
  }

  /**
   * Remove todas as tags
   */
  public clear(): void {
    for (const property in this.properties) {
      delete this.properties[property];
    }
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return Object.keys(this.properties).join(', ');
  };
}
