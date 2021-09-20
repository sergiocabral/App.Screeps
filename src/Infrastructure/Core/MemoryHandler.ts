import { KeyValue } from '@sergiocabral/helper';
import { ToText } from '../Helper/ToText';

/**
 * Abstração para classes que manipulam o Memory.
 */
export abstract class MemoryHandler<T> {
  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   * @param defaultValue Constrói o valor padrão se não existir.
   */
  protected constructor(
    memory: Memory,
    protected readonly propertyName: string,
    defaultValue: () => T
  ) {
    this.memory = memory as unknown as KeyValue;
    if (this.source === undefined) {
      this.source = defaultValue();
    }
  }

  /**
   * Instância da memória.
   * @private
   */
  private readonly memory: KeyValue;

  /**
   * Objeto que servirá de fonte de dados.
   * @private
   */
  protected get source(): T {
    return this.memory[this.propertyName] as T;
  }

  /**
   * Objeto que servirá de fonte de dados.
   * @private
   */
  protected set source(value: T) {
    this.memory[this.propertyName] = value;
  }

  /**
   * Limpa o valor da memória.
   * @protected
   */
  protected clearMemory(): void {
    delete this.memory[this.propertyName];
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
