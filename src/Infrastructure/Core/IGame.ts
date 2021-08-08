import { ILoop } from './ILoop';
import { IListOfScheduledMessagesType } from '../Schedule/IListOfScheduledMessagesType';
import { IConsoleHelpCommands } from '../Console/IConsoleHelpCommands';

/**
 * Interface para modo de operação de jogo.
 */
export interface IGame
  extends ILoop,
    IListOfScheduledMessagesType,
    IConsoleHelpCommands {}
