/**
 * Filtro para consulta de entidade: com roles
 */
export type TemplateFilterWithRoles = {
  /**
   * Com uma ou mais roles.
   */
  withRoles?: string[];

  /**
   * Sem uma ou mais roles.
   */
  withoutRoles?: string[];
};
