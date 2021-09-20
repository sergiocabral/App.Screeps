import { FactoryCreep } from '../Screeps/Creep/FactoryCreep';

/**
 * Representa funcionalidade específicas do modo de jogo em execução.
 */
export interface IGameMode {
  /**
   * Construtor de creeps.
   * @protected
   */
  get factoryCreep(): FactoryCreep;
}
