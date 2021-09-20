import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';

/**
 * Creep
 */
export class FlagWrapper extends WrapperRolesAndPropertiesBase<Flag> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(instance: Flag, screepsEnvironment: IScreepsEnvironment) {
    super(instance, screepsEnvironment, 'flags');
  }
}
