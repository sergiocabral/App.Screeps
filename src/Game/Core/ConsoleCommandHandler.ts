import { Message } from '@sergiocabral/helper';
import { IScreepsOperation } from '../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { ReceivedConsoleCommand } from '../../Infrastructure/Console/Message/ReceivedConsoleCommand';
import { IGameExecutor } from './IGameExecutor';

/**
 * Trata comandos recebidos pelo console.
 */
export class ConsoleCommandHandler {
  /**
   * Construtor.
   * @param screepsOperation
   * @param gameMode
   */
  public constructor(
    private readonly screepsOperation: IScreepsOperation,
    private readonly gameMode: IGameExecutor
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
    const exceptFirstArg = Array<string>().concat(message.args).splice(1);
    switch (message.command) {
      case 'redefine':
        if (message.args.length > 0 && message.args[0] === 'creeps') {
          this.redefineCreeps(...exceptFirstArg);
          message.processed = true;
        }
        break;
    }
  }

  private redefineCreeps(...creepsName: string[]): void {
    const creeps =
      creepsName.length > 0
        ? this.screepsOperation.query.creep.getByName.with(...creepsName)
        : this.screepsOperation.query.creep.getAll();
    this.gameMode.factoryCreep.redefine(...creeps);
  }
}
