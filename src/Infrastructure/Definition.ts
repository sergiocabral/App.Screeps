import { IListOfScheduledMessagesType } from './Schedule/IListOfScheduledMessagesType';
import { ShowDebugToConsole } from './Console/Message/ShowDebugToConsole';
import { IConsoleHelpCommands } from './Console/IConsoleHelpCommands';

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
  public static readonly IntervalInMinutesToShowDebug = 10;

  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  public static readonly ListOfScheduledMessagesType: IListOfScheduledMessagesType =
    {
      scheduledMessageTypes: [ShowDebugToConsole]
    };

  /**
   * Representação das informações de ajuda para comandos de console.
   */
  public static readonly ConsoleHelpCommand: IConsoleHelpCommands = {
    help: `
> help
  Para enviar comandos através do console atribua o nome do comando e seus
  argumentos à variável: Memory.{MemoryConsoleCommand}
  Por exemplo, para exibir essa ajuda escreva no console:
  Memory.{MemoryConsoleCommand} = "help";
  
> debug  
  Exibe informações de depuração referente a execução do código no Screeps.
  O resultado desse comando já emitido no console automaticamente
  a cada {IntervalInMinutesToShowDebug} minutos. 
`
  };
}
