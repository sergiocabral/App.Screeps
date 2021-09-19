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
   * Estampa do build.
   */
  stamp: string;

  /**
   * Momento da atualização.
   */
  updated: number;
}
