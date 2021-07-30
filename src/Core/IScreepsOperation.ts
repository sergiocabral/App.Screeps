import { Query } from '../Screeps/Query';

/**
 * Responsável por operar o Screeps.
 */
export interface IScreepsOperation {
  /**
   * Consulta informações do jogo.
   */
  readonly query: Query;
}
