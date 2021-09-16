import { Logger, LogLevel, Message } from '@sergiocabral/helper';
import { ReceivedConsoleCommand } from '../Console/Message/ReceivedConsoleCommand';
import { TerrainMap } from '../Helper/TerrainMap';

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
   */
  public constructor() {
    Message.subscribe(
      ReceivedConsoleCommand,
      ConsoleCommandHandler.handleReceivedConsoleCommand.bind(this)
    );
  }

  /**
   * Mensagem: ReceivedConsoleCommand
   * @param message
   * @private
   */
  private static handleReceivedConsoleCommand(
    message: ReceivedConsoleCommand
  ): void {
    switch (message.command) {
      case 'map':
        if (message.args.length === 1) {
          ConsoleCommandHandler.map(message.args[0] ?? '');
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
}
