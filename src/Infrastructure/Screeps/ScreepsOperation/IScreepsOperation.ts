import { Query } from './Query';
import { Entity } from './Entity';
import { GarbageCollector } from './GarbageCollector';

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

  /**
   * Responsável por limpar o lixo da memoria
   */
  readonly garbageCollector: GarbageCollector;
}
