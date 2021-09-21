import { HelperObject, Logger, LogLevel, Message } from '@sergiocabral/helper';
import { CreepDiedEvent } from './Message/CreepDiedEvent';
import { RunGarbageCollector } from '../../Core/Message/RunGarbageCollector';

/**
 * Responsável por limpar o lixo da memoria.
 */
export class DisposeMissingObject {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'DisposeMissingObject';

  /**
   * Construtor.
   * @param memory Memória.
   */
  constructor(private memory: Memory) {
    Message.subscribe(RunGarbageCollector, () =>
      this.deleteMemoryOfMissingCreeps()
    );
  }

  /**
   * Limpa as memórias de creeps que já morreram.
   * @private
   */
  private deleteMemoryOfMissingCreeps(): void {
    let creepsCount = 0;
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
          DisposeMissingObject.LoggerSection
        );

        const data = Memory.creeps[creepName];

        delete Memory.creeps[creepName];
        creepsCount++;

        if (data) void new CreepDiedEvent(creepName, data).send();
      }
    }

    if (creepsCount > 0) {
      Logger.post(
        'A total of {totalBytes} bytes were discarded by dead creeps.',
        () => {
          return {
            totalBytes: totalBytes.format({ digits: 0 })
          };
        },
        LogLevel.Verbose,
        DisposeMissingObject.LoggerSection
      );
      Logger.post(
        'A total of {creepsCount} creeps had their memories discarded.',
        () => {
          return {
            creepsCount: creepsCount.format({ digits: 0 })
          };
        },
        LogLevel.Debug,
        DisposeMissingObject.LoggerSection
      );
    }
  }
}
