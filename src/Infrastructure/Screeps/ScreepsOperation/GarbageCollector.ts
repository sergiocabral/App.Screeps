/**
 * Responsável por limpar o lixo da memoria.
 */
import { HelperObject, Logger, LogLevel, Message } from '@sergiocabral/helper';
import { CreepDiedEvent } from './Message/CreepDiedEvent';
import { RunGarbageCollector } from './Message/RunGarbageCollector';

export class GarbageCollector {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'GarbageCollector';

  /**
   * Construtor.
   * @param memory Memória.
   */
  constructor(private memory: Memory) {
    Message.subscribe(RunGarbageCollector, () => this.recycle());
  }

  /**
   * Limpa as memórias de creeps que já morreram.
   * @private
   */
  private deleteMemoryOfMissingCreeps(): void {
    let totalBytes = 0;
    for (const creepName in this.memory.creeps) {
      if (!(creepName in Game.creeps)) {
        Logger.post(
          'Discarded {bytes} bytes of memory from Creep "{creepName}" dead:\n{json}',
          () => {
            const json = HelperObject.toText(Memory.creeps[creepName]);
            const bytes = json.length;
            totalBytes += bytes;
            return { bytes: bytes.format({ digits: 0 }), creepName, json };
          },
          LogLevel.Verbose,
          GarbageCollector.LoggerSection
        );

        const data = Memory.creeps[creepName];

        delete Memory.creeps[creepName];

        if (data) void new CreepDiedEvent(creepName, data).send();
      }
    }

    if (totalBytes > 0) {
      Logger.post(
        'A total of {totalBytes} bytes were discarded.',
        { totalBytes: totalBytes.format({ digits: 0 }) },
        LogLevel.Debug,
        GarbageCollector.LoggerSection
      );
    }
  }

  /**
   * Faz a reciclagem da memória para liberar o que não está em uso.
   */
  public recycle(): void {
    console.log('garbage collector');
    this.deleteMemoryOfMissingCreeps();
  }
}
