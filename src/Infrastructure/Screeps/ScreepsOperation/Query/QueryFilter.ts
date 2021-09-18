/**
 * Filtro para consulta.
 */
export type QueryFilter = {
  /**
   * Com o nome.
   */
  withName?: string;

  /**
   * Sem o nome.
   */
  withoutName?: string;

  /**
   * Com uma ou mais roles.
   */
  withRoles?: string[];

  /**
   * Sem uma ou mais roles.
   */
  withoutRoles?: string[];
};
