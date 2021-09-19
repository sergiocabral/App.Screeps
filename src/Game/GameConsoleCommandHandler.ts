import { Logger, LogLevel, Message } from '@sergiocabral/helper';
import { IScreepsOperation } from '../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { ReceivedConsoleCommand } from '../Infrastructure/Console/Message/ReceivedConsoleCommand';
import { IGameMode } from './IGameMode';

/**
 * Trata comandos recebidos pelo console.
 */
export class GameConsoleCommandHandler {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'GameConsoleCommand';

  /**
   * Construtor.
   * @param screepsOperation
   * @param gameMode
   */
  public constructor(
    private readonly screepsOperation: IScreepsOperation,
    private readonly gameMode: IGameMode
  ) {
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
      case 'redefine':
      case 'kill':
        if (message.args.length === 1 && message.args[0] === 'creeps') {
          this.redefineCreeps();
          message.processed = true;
        }
        break;
    }
  }

  private redefineCreeps(): void {
    const creeps = this.screepsOperation.query.creep.getAll();
    if (creeps.length > 0) {
      for (const creep of creeps) {
        this.gameMode.factoryCreep.redefine(creep);
      }
      Logger.post(
        'A total of {count} creeps were redefined.',
        {
          count: creeps.length
        },
        LogLevel.Information,
        GameConsoleCommandHandler.LoggerSection
      );
    } else {
      Logger.post(
        'There are no creeps to be redefined.',
        undefined,
        LogLevel.Information,
        GameConsoleCommandHandler.LoggerSection
      );
    }
  }
}
