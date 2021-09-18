/**
 * Filtro para consulta.
 */
import { SpawnWrapper } from '../../Entity/SpawnWrapper';

export type QueryFilter = {
  /**
   * Com o nome.
   */
  withName?: string[];

  /**
   * Sem o nome.
   */
  withoutName?: string[];

  /**
   * Com o nome.
   */
  withSpawn?: SpawnWrapper[];

  /**
   * Não pertence a um spawn
   */
  withoutSpawn?: SpawnWrapper[];

  /**
   * Com uma ou mais roles.
   */
  withRoles?: string[];

  /**
   * Sem uma ou mais roles.
   */
  withoutRoles?: string[];

  /**
   * Com uma ou mais propriedades definidas.
   */
  withProperties?: string[];

  /**
   * Sem uma ou mais propriedades definidas.
   */
  withoutProperties?: string[];

  /**
   * Com uma propriedade tendo um ou mais valores.
   */
  withPropertyValues?: [string, unknown[]];

  /**
   * Sem uma propriedade tendo um ou mais valores.
   */
  withoutPropertyValues?: [string, unknown[]];
};
