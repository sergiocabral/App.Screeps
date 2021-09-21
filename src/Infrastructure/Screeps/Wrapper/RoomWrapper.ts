import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';

/**
 * Room
 */
export class RoomWrapper extends WrapperRolesAndPropertiesBase<Room> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(instance: Room, screepsEnvironment: IScreepsEnvironment) {
    super(instance, screepsEnvironment, 'rooms');
  }
}
