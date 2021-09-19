import { FactoryCreep } from './FactoryCreep';

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
