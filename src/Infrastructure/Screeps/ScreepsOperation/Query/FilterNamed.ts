import { Filter } from './Filter';

/**
 * Filtro para consulta de entidade: com nome
 */
export type FilterNamed = Filter & {
  /**
   * Com o nome.
   */
  withName?: string[];

  /**
   * Sem o nome.
   */
  withoutName?: string[];

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
