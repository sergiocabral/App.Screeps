import { Query } from '../Screeps/Query';

/**
 * Propriedades que lidam diretamente com o ambiente do Screeps.
 */
export interface IScreepsEnvironment {
  /**
   * Consulta informações do jogo.
   */
  readonly query: Query;
}
