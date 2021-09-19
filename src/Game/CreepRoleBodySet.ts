import { CreepRole } from './CreepRole';
import { BodyPartSet } from '@sergiocabral/screeps';

/**
 * Conjunto de informações para uma role de creep.
 */
export type CreepRoleBodySet = {
  /**
   * Roles.
   */
  roles: CreepRole[];

  /**
   * Partes do corpo.
   */
  bodyParts: BodyPartSet;
};
