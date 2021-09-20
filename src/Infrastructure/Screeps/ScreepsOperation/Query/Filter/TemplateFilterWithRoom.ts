import { TemplateFilter } from './TemplateFilter';

/**
 * Filtro para consulta de entidade: dentro de uma sala
 */
export type TemplateFilterWithRoom = TemplateFilter & {
  /**
   * Com o nome.
   */
  withRoom?: Room[];

  /**
   * Não pertence a um spawn
   */
  withoutRoom?: Room[];
};
