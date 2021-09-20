import { SpawnWrapper } from '../../../Entity/SpawnWrapper';
import { TemplateFilter } from './TemplateFilter';

/**
 * Filtro para consulta de entidade: dentro de uma sala
 */
export type TemplateFilterWithRoom = TemplateFilter & {
  /**
   * Com o nome.
   */
  withSpawn?: SpawnWrapper[];

  /**
   * Não pertence a um spawn
   */
  withoutSpawn?: SpawnWrapper[];
};
