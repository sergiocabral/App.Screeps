import { TemplateFilterWithName } from './TemplateFilterWithName';
import { TemplateFilterWithId } from './TemplateFilterWithId';
import { TemplateFilterWithRoom } from './TemplateFilterWithRoom';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRolesAndProperties } from './TemplateFilterWithRolesAndProperties';

/**
 * Filtro para consulta de entidade: Creeps
 */
export type FilterCreep = TemplateFilter &
  TemplateFilterWithId &
  TemplateFilterWithName &
  TemplateFilterWithRoom &
  TemplateFilterWithRolesAndProperties & {
    // Sem campos
  };
