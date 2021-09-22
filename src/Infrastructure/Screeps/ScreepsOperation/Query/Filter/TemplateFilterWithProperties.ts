/**
 * Filtro para consulta de entidade: propriedades
 */
export type TemplateFilterWithProperties = {
  /**
   * Com zero ou alguma propriedade.
   */
  withEmptyProperties?: boolean;

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
