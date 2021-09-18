import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { TagManager } from '../../Data/TagManager';
import { Named } from '../../Type/Named';
import { KeyValueManager } from '../../Data/KeyValueManager';

/**
 * Creep
 */
export abstract class WrapperBase<TScreepsEntity extends Named> {
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
      this.getEntryFromMemory<string[]>(this.roleMemoryEntry, []),
      this.onRoleChanged.bind(this)
    );
    this.properties = new KeyValueManager(
      this.getEntryFromMemory<Record<string, unknown>>(
        this.propertiesMemoryEntry,
        {}
      ),
      this.onPropertiesChanged.bind(this)
    );
  }

  /**
   * Entrada na memória para role.
   * @private
   */
  private readonly roleMemoryEntry: string = 'roles';

  /**
   * Entrada na memória para properiedades.
   * @private
   */
  private readonly propertiesMemoryEntry: string = 'props';

  /**
   * Papeis do creep.
   */
  public readonly roles: TagManager;

  /**
   * Propriedades gerais.
   */
  public readonly properties: KeyValueManager;

  /**
   * Quando a lista de roles é alterada.
   * @private
   */
  private onRoleChanged(): void {
    this.setEntryToMemory(
      this.roleMemoryEntry,
      this.roles.list.length ? this.roles.list : undefined
    );
  }

  /**
   * Quando a lista de roles é alterada.
   * @private
   */
  private onPropertiesChanged(): void {
    this.setEntryToMemory(
      this.propertiesMemoryEntry,
      Object.keys(this.properties.dataset).length
        ? this.properties.dataset
        : undefined
    );
  }

  /**
   * Retorna o objeto de memória devidamente tipado.
   * @private
   */
  private getMemory<TType>(): Record<
    string,
    Record<string, Record<string, TType>>
  > {
    return this.screepsEnvironment.memory as unknown as Record<
      string,
      Record<string, Record<string, TType>>
    >;
  }

  /**
   * Retorna uma entrada da memória para esta instância
   * @param entryName Nome no objeto Memory
   * @param defaultValue Valor padrão se não existir.
   * @private
   */
  private getEntryFromMemory<TType>(
    entryName: string,
    defaultValue: TType
  ): TType {
    const memory = this.getMemory<TType>();
    const memoryEntry = memory[this.instanceMemoryEntry];
    if (memoryEntry !== undefined) {
      const instanceEntry = memoryEntry[this.instance.name];
      if (instanceEntry !== undefined) {
        const value = instanceEntry[entryName];
        if (value !== undefined) {
          return value;
        }
      }
    }
    return defaultValue;
  }

  /**
   * Define uma entrada da memória para esta instância
   * @param entryName Nome no objeto Memory
   * @param value Valor para definir.
   * @private
   */
  private setEntryToMemory<TType>(entryName: string, value?: TType): void {
    const memory = this.getMemory<TType>();
    let memoryEntry = memory[this.instanceMemoryEntry];
    let instanceEntry = memoryEntry
      ? memoryEntry[this.instance.name]
      : undefined;
    if (value === undefined) {
      if (memoryEntry !== undefined) {
        if (instanceEntry !== undefined) {
          delete instanceEntry[entryName];
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
      instanceEntry[entryName] = value;
    }
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return this.instance.name;
  };
}
