import { TemplateFilterWithName } from './TemplateFilterWithName';
import { TemplateFilterWithId } from './TemplateFilterWithId';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRoles } from './TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './TemplateFilterWithProperties';
import { TemplateFilterWithRoom } from './TemplateFilterWithRoom';

/**
 * Filtro para consulta de entidade: Spawn
 */
export type FilterSpawn = TemplateFilter &
  TemplateFilterWithId &
  TemplateFilterWithName &
  TemplateFilterWithRoom &
  TemplateFilterWithRoles &
  TemplateFilterWithProperties & {
    // Sem campos.
  };
