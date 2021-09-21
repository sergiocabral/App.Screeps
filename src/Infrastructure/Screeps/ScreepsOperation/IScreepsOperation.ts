import { Queries } from './Query/Queries';
import { Entities } from './Entity/Entities';

/**
 * Responsável por operar o Screeps.
 */
export interface IScreepsOperation {
  /**
   * Consulta informações do jogo.
   */
  readonly query: Queries;

  /**
   * Entidades do jogo.
   */
  readonly entity: Entities;
}
