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
    this.gameMode.factoryCreep.redefine(...creeps);
  }
}
