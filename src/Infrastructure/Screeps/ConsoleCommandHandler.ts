import { Logger, LogLevel, Message } from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from '../Console/Message/ReceivedConsoleCommand';
import { TerrainMap } from '@sergiocabral/screeps';
import { IScreepsOperation } from './ScreepsOperation/IScreepsOperation';
import { RunGarbageCollector } from '../Core/Message/RunGarbageCollector';

/**
 * Trata comandos recebidos pelo console.
 */
export class ConsoleCommandHandler {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'ConsoleCommand';

  /**
   * Construtor.
   * @param screepsOperation
   */
  public constructor(private screepsOperation: IScreepsOperation) {
    Message.subscribe(
      ReceivedConsoleCommand,
      this.handleReceivedConsoleCommand.bind(this)
    );
  }

  /**
   * Mensagem: ReceivedConsoleCommand
   * @param message
   * @private
   */
  private handleReceivedConsoleCommand(message: ReceivedConsoleCommand): void {
    switch (message.command) {
      case 'map':
        if (message.args.length === 1) {
          ConsoleCommandHandler.map(message.args[0] ?? '');
          message.processed = true;
        }
        break;
      case 'gc':
        if (message.args.length === 0) {
          new RunGarbageCollector().send();
          message.processed = true;
        }
        break;
      case 'kill':
        if (message.args.length >= 1 && message.args[0] === 'creeps') {
          const creepsName = Array<string>().concat(message.args);
          creepsName.splice(0, 1);
          this.killCreeps(...creepsName);
          message.processed = true;
        }
        break;
    }
  }

  /**
   * Exibe a visualização do map de uma localização.
   * @param location Localização.
   * @private
   */
  public static map(location: string): void {
    try {
      const terrainMap = new TerrainMap(location).getMatrixAsText();
      Logger.post(
        'Visualization of map location {location}:',
        {
          location
        },
        LogLevel.Information,
        ConsoleCommandHandler.LoggerSection
      );
      console.log(terrainMap);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message.replace(/^[^:]+:\s*/, '')
          : String(error);
      Logger.post(
        errorMessage,
        undefined,
        LogLevel.Error,
        ConsoleCommandHandler.LoggerSection
      );
    }
  }

  private killCreeps(...creepsName: string[]): void {
    const creeps =
      creepsName.length === 0
        ? this.screepsOperation.query.creep.getAll()
        : this.screepsOperation.query.creep.getByName.with(...creepsName);
    if (creeps.length > 0) {
      for (const creep of creeps) {
        Logger.post(
          'Killing creep: {creep}',
          { creep },
          LogLevel.Debug,
          ConsoleCommandHandler.LoggerSection
        );
        creep.instance.suicide();
      }
      Logger.post(
        'A total of {count} creeps were killed.',
        {
          count: creeps.length
        },
        LogLevel.Information,
        ConsoleCommandHandler.LoggerSection
      );
    } else {
      Logger.post(
        'There are no creeps to be killed.',
        undefined,
        LogLevel.Information,
        ConsoleCommandHandler.LoggerSection
      );
    }
  }
}
