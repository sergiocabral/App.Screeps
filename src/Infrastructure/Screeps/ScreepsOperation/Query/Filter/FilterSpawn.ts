import { TemplateFilterWithName } from './TemplateFilterWithName';
import { TemplateFilterWithId } from './TemplateFilterWithId';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRolesAndProperties } from './TemplateFilterWithRolesAndProperties';

/**
 * Filtro para consulta de entidade: Spawn
 */
export type FilterSpawn = TemplateFilter &
  TemplateFilterWithId &
  TemplateFilterWithName &
  TemplateFilterWithRolesAndProperties & {
    // Sem campos.
  };
