import { Constant } from '@sergiocabral/screeps';
import { HelperObject, Logger, LogLevel } from '@sergiocabral/helper';
import { ControlBase } from './ControlBase';
import { FlagWrapper } from '../../Wrapper/FlagWrapper';

/**
 * Controlar entidades do jogo: Flag
 */
export class ControlFlag extends ControlBase {
  /**
   * Seção identificador do log.
   * @private
   */
  private static LoggerSection = 'EntityFlag';

  /**
   * Inicia a criação de um Creep a partir de um Spawn.
   * @param flagName
   * @param roomName
   * @param x
   * @param y
   */
  create(flagName: string, roomName: string, x = 0, y = 0): FlagWrapper | null {
    const roomPosition = new RoomPosition(x, y, roomName);
    const statusCode = roomPosition.createFlag(flagName);

    if (statusCode !== flagName) {
      Logger.post(
        'Flag "{flagName}" cannot be created. Error code: {statusCode}',
        { flagName, statusCode: Constant.format(statusCode) },
        LogLevel.Error,
        ControlFlag.LoggerSection
      );
      return null;
    }
    const flag = this.screepsEnvironment.game.flags[flagName];
    if (!flag) {
      Logger.post(
        'The flag "{flagName}" was created, but the flag was not found.',
        { flagName },
        LogLevel.Critical,
        ControlFlag.LoggerSection
      );
      return null;
    }

    const flagWrapper = new FlagWrapper(flag, this.screepsEnvironment);

    Logger.post(
      'Properties of new flag "{flagName}": {json}',
      () => {
        return {
          flagName,
          json: HelperObject.toText(flag)
        };
      },
      LogLevel.Verbose,
      ControlFlag.LoggerSection
    );

    Logger.post(
      'The flag "{flagName}" was created in the {roomName} room at coordinates x={x} and y={y}.',
      { flagName, roomName, x, y },
      LogLevel.Debug,
      ControlFlag.LoggerSection
    );

    return flagWrapper;
  }
}
