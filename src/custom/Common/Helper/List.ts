/**
 * Utilitários para manipulação de lustas.
 */
export abstract class List {
  /**
   * Retorna um valor aleatório da liuta.
   * @param array
   */
  public static getRandom<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length * 10) % array.length;
    return array[randomIndex];
  }
}
