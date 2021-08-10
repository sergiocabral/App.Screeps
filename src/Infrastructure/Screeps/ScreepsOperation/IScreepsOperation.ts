import { Query } from './Query';
import { Entity } from './Entity';

/**
 * Responsável por operar o Screeps.
 */
export interface IScreepsOperation {
  /**
   * Consulta informações do jogo.
   */
  readonly query: Query;

  /**
   * Entidades do jogo.
   */
  readonly entity: Entity;
}
