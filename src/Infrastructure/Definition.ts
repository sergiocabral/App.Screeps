import { IListOfScheduledMessagesType } from './Schedule/IListOfScheduledMessagesType';
import { ShowDebugToConsole } from './Console/Message/ShowDebugToConsole';

/**
 * Conjunto de definições configuráveis
 */
export class Definition {
  /**
   * Propriedade em Memory para: Receber comandos pelo console.
   */
  public static readonly MemoryConsoleCommand = 'run';

  /**
   * Propriedade em Memory para: Registrar o tempo de execução.
   */
  public static readonly MemoryClockTime = 'time';

  /**
   * Propriedade em Memory para: Agendador de mensagens.
   */
  public static readonly MemoryScheduler = 'scheduler';

  /**
   * Intervalo entre exibição de informações de debug no console.
   */
  public static readonly intervalInMinutesToShowDebug = 10;

  /**
   * Lista de comandos.
   */
  public static readonly commandList = {
    showDebugToConsole: 'debug'
  };

  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  public static readonly listOfScheduledMessagesType: IListOfScheduledMessagesType =
    {
      scheduledMessageTypes: [ShowDebugToConsole]
    };
}
