/**
 * Filtro para consulta de entidade: com nome
 */
export type TemplateFilterWithName = {
  /**
   * Com o nome.
   */
  withName?: string[];

  /**
   * Sem o nome.
   */
  withoutName?: string[];
};
