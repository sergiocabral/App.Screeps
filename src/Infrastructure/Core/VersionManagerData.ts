/**
 * Informações sobre a versão atual.
 */
export interface VersionManagerData {
  /**
   * Major da versão.
   */
  major: number;

  /**
   * Número do build.
   */
  build: number;

  /**
   * Hash do build.
   */
  hash: string;

  /**
   * Valor único por build.
   */
  nonce: string;

  /**
   * Momento da atualização.
   */
  updated: number;
}
