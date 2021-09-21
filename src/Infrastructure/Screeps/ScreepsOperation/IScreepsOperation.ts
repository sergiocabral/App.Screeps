import { Queries } from './Query/Queries';
import { Controls } from './Control/Controls';

/**
 * Responsável por operar o Screeps.
 */
export interface IScreepsOperation {
  /**
   * Consulta informações do jogo.
   */
  readonly query: Queries;

  /**
   * Controlador de entidades do jogo.
   */
  readonly control: Controls;
}
