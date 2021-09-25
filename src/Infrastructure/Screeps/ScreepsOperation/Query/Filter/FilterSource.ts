import { TemplateFilterWithRoom } from './TemplateFilterWithRoom';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRoles } from './TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './TemplateFilterWithProperties';
import { TemplateFilterWithId } from './TemplateFilterWithId';

/**
 * Filtro para consulta de entidade: Creeps
 */
export type FilterSource = TemplateFilter &
  TemplateFilterWithId &
  TemplateFilterWithRoom &
  TemplateFilterWithRoles &
  TemplateFilterWithProperties & {
    // Sem campos
  };
