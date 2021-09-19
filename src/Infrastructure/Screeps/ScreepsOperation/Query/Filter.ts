/**
 * Filtro para consulta de entidade.
 */
export type Filter = {
  /**
   * Com o id.
   */
  withId?: string[];

  /**
   * Sem o id.
   */
  withoutId?: string[];
};
