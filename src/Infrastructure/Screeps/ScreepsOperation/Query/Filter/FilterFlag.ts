import { TemplateFilterWithName } from './TemplateFilterWithName';
import { TemplateFilterWithRoom } from './TemplateFilterWithRoom';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRoles } from './TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './TemplateFilterWithProperties';

/**
 * Filtro para consulta de entidade: Creeps
 */
export type FilterFlag = TemplateFilter &
  TemplateFilterWithName &
  TemplateFilterWithRoom &
  TemplateFilterWithRoles &
  TemplateFilterWithProperties & {
    // Sem campos
  };
