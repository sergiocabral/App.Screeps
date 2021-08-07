import { ILoop } from './ILoop';
import { IListOfScheduledMessagesType } from '../Schedule/IListOfScheduledMessagesType';

/**
 * Interface para modo de operação de jogo.
 */
export interface IGame extends ILoop, IListOfScheduledMessagesType {}
