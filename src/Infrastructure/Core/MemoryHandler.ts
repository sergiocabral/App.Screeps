import {
  HelperObject,
  KeyValue,
  Logger,
  LogLevel,
  Message
} from '@sergiocabral/helper';
import { ToText } from '../Helper/ToText';
import { RunGarbageCollector } from './Message/RunGarbageCollector';

/**
 * Abstração para classes que manipulam o Memory.
 */
export abstract class MemoryHandler<T> {
  /**
   * Seção do log.
   * @private
   */
  private static readonly loggerSection = 'MemoryHandler';

  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   * @param defaultValue Constrói o valor padrão se não existir.
   */
  protected constructor(
    memory: Memory,
    protected readonly propertyName: string,
    private defaultValue: () => T
  ) {
    this.memory = memory as unknown as KeyValue;
    if (this.source === undefined) {
      this.source = defaultValue();
    }
    Message.subscribe(
      RunGarbageCollector,
      this.handleRunGarbageCollector.bind(this)
    );
  }

  /**
   * Mensagem: RunGarbageCollector
   * @private
   */
  private handleRunGarbageCollector() {
    if (!this.useGarbageCollector) return;

    const isObject = typeof this.source === 'object' && this.source;
    if (!isObject) return;

    const example = this.defaultValue();
    const exampleKeys = Object.keys(example);

    const properties = Array<string>();
    let totalBytes = 0;
    const current = this.source as Record<string, unknown>;
    for (const key of Object.keys(current)) {
      if (!exampleKeys.includes(key)) {
        Logger.post(
          'Discarded {bytes} bytes of memory from Memory["{memoryName}"]["{key}"] memory:\n{json}',
          () => {
            const json = HelperObject.toText(current[key]);
            const bytes = json.length;
            totalBytes += bytes;
            return {
              key,
              bytes: bytes.format({ digits: 0 }),
              memoryName: this.propertyName,
              json
            };
          },
          LogLevel.Verbose,
          MemoryHandler.loggerSection
        );
        delete current[key];
        properties.push(key);
      }
    }

    if (properties.length > 0) {
      Logger.post(
        'A total of {totalBytes} bytes were discarded by old properties in Memory["{memoryName}"].',
        () => {
          return {
            totalBytes: totalBytes.format({ digits: 0 }),
            memoryName: this.propertyName
          };
        },
        LogLevel.Verbose,
        MemoryHandler.loggerSection
      );

      Logger.post(
        '{propertiesCount} property(ies) discarded in Memory["{memoryName}"]: {properties}',
        {
          memoryName: this.propertyName,
          propertiesCount: properties.length,
          properties: properties.map(property => `"${property}"`).join(', ')
        },
        LogLevel.Debug,
        MemoryHandler.loggerSection
      );
    }
  }

  /**
   * Instância da memória.
   * @private
   */
  private readonly memory: KeyValue;

  /**
   * Sinaliza que deve (ou não) usar o garbage collector.
   * @protected
   */
  protected useGarbageCollector = true;

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
