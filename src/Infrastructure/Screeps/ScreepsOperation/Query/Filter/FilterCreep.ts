import { TemplateFilterWithName } from './TemplateFilterWithName';
import { TemplateFilterWithId } from './TemplateFilterWithId';
import { TemplateFilterWithRoom } from './TemplateFilterWithRoom';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRoles } from './TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './TemplateFilterWithProperties';

/**
 * Filtro para consulta de entidade: Creeps
 */
export type FilterCreep = TemplateFilter &
  TemplateFilterWithId &
  TemplateFilterWithName &
  TemplateFilterWithRoom &
  TemplateFilterWithRoles &
  TemplateFilterWithProperties & {
    // Sem campos
  };
