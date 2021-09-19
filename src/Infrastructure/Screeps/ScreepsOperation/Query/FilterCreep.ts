import { SpawnWrapper } from '../../Entity/SpawnWrapper';
import { FilterNamed } from './FilterNamed';

/**
 * Filtro para consulta de entidade: Creeps
 */
export type FilterCreep = FilterNamed & {
  /**
   * Com o nome.
   */
  withSpawn?: SpawnWrapper[];

  /**
   * Não pertence a um spawn
   */
  withoutSpawn?: SpawnWrapper[];
};
