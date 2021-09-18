import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { TagManager } from '../../Data/TagManager';
import { Named } from '../../Type/Named';

/**
 * Creep
 */
export abstract class BaseWrapper<TScreepsEntity extends Named> {
  /**
   * Construtor.
   * @param instance Instância original no Screeps.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   * @param instanceMemoryEntry Nome da propriedade do objeto Memory usada para a classe.
   */
  protected constructor(
    public instance: TScreepsEntity,
    protected readonly screepsEnvironment: IScreepsEnvironment,
    private readonly instanceMemoryEntry: string
  ) {
    this.roles = new TagManager(
      this.onRoleChanged.bind(this),
      this.onRoleChanged.bind(this)
    );
    this.roles.add(...this.getTagFromMemory<string>(this.roleMemoryEntry));

    this.onInitialize();
  }

  /**
   * Chamada durante a construção.
   * @protected
   */
  protected onInitialize(): void {
    // Implementar nas classes filhas se necessário.
  }

  /**
   * Entrada na memória para role.
   * @private
   */
  private readonly roleMemoryEntry: string = 'roles';

  /**
   * Retorna o objeto de memória devidamente tipado.
   * @private
   */
  private getMemory<TType>(): Record<
    string,
    Record<string, Record<string, TType[]>>
  > {
    return this.screepsEnvironment.memory as unknown as Record<
      string,
      Record<string, Record<string, TType[]>>
    >;
  }

  /**
   * Papeis do creep.
   */
  public readonly roles: TagManager;

  /**
   * Retorna tags da memória para esta instância.
   * @param property Nome da propriedade no objeto Memory
   * @private
   */
  private getTagFromMemory<TType>(property: string): TType[] {
    const memory = this.getMemory<TType>();
    const memoryEntry = memory[this.instanceMemoryEntry];
    if (memoryEntry !== undefined) {
      const instanceEntry = memoryEntry[this.instance.name];
      if (instanceEntry !== undefined) {
        const tags = instanceEntry[property];
        if (tags !== undefined) {
          return tags;
        }
      }
    }
    return [];
  }

  /**
   * Define tags na memória para esta instância.
   * @param property Nome da propriedade no objeto Memory
   * @param tags Valor da tag.
   * @private
   */
  private setTagToMemory<TType>(property: string, tags: TType[]): void {
    const memory = this.getMemory<TType>();
    let memoryEntry = memory[this.instanceMemoryEntry];
    let instanceEntry = memoryEntry
      ? memoryEntry[this.instance.name]
      : undefined;
    if (tags.length === 0) {
      if (memoryEntry !== undefined) {
        if (instanceEntry !== undefined) {
          delete instanceEntry[property];
          if (Object.keys(instanceEntry).length === 0) {
            delete memoryEntry[this.instance.name];
          }
        }
        if (Object.keys(memoryEntry).length === 0) {
          delete memory[this.instanceMemoryEntry];
        }
      }
    } else {
      if (memoryEntry === undefined) {
        memory[this.instanceMemoryEntry] = memoryEntry = {};
      }
      if (instanceEntry === undefined) {
        memoryEntry[this.instance.name] = instanceEntry = {};
      }
      instanceEntry[property] = tags;
    }
  }

  /**
   * Quando a lista de roles é alterada.
   * @private
   */
  private onRoleChanged(): void {
    this.setTagToMemory(this.roleMemoryEntry, this.roles.list);
  }
}
