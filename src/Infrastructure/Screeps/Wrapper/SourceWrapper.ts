import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from './WrapperIdOrNamedBase';

/**
 * Source
 */
export class SourceWrapper extends WrapperRolesAndPropertiesBase<Source> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param room Sala vinculada.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    instance: Source,
    public room: Room,
    screepsEnvironment: IScreepsEnvironment
  ) {
    super(instance, screepsEnvironment, 'sources');
  }
}