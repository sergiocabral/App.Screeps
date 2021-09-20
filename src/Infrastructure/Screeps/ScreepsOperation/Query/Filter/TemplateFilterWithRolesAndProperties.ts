/**
 * Filtro para consulta de entidade: com roles e propriedades
 */
export type TemplateFilterWithRolesAndProperties = {
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
