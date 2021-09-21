import { TemplateFilterWithName } from './TemplateFilterWithName';
import { TemplateFilter } from './TemplateFilter';
import { TemplateFilterWithRoles } from './TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './TemplateFilterWithProperties';

/**
 * Filtro para consulta de entidade: Room
 */
export type FilterRoom = TemplateFilter &
  TemplateFilterWithName &
  TemplateFilterWithRoles &
  TemplateFilterWithProperties & {
    // Sem campos.
  };
