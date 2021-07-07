/**
 * Par de chave e valor através de índice.
 */
export interface KeyValue<T = string> {
  /**
   * Assinatura Index.
   */
  [index: string]: T;
}
