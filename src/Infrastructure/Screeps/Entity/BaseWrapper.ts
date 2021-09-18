import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { TagManager } from '../../Data/TagManager';

/**
 * Creep
 */
export abstract class BaseWrapper<TScreepsEntity> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(
    public instance: TScreepsEntity,
    protected readonly screepsEnvironment: IScreepsEnvironment
  ) {
    this.onInitialize();
  }

  /**
   * Chamada durante a construção.
   * @protected
   */
  protected onInitialize(): void {
    // Implementar nas subclasses se preciso.
  }

  /**
   * Papeis do creep.
   */
  public readonly roles: TagManager = new TagManager();
}
