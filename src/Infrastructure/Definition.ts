import { IListOfScheduledMessagesType } from './Schedule/IListOfScheduledMessagesType';
import { ShowDebugToConsole } from './Console/Message/ShowDebugToConsole';
import { IConsoleHelpCommands } from './Console/IConsoleHelpCommands';

/**
 * Conjunto de definições configuráveis
 */
export class Definition {
  /**
   * Propriedade em Game para: instância da aplicação.
   */
  public static readonly GameApplication = 'app';

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
   * Propriedade em Memory para: Logger
   */
  public static readonly MemoryLogger = 'logger';

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
# Lista de comandos através da atribuição:
  Memory.{MemoryConsoleCommand} = "comando";
    
  > help
  Exibe esta ajuda.
  
  > log [level]
  Verifica ou define o nível mínimo de log a ser exibido no console. Níveis
  disponíveis: Verbose, Debug, Information, Warning, Error, Critical, Fatal
  
  > debug  
  Exibe informações de depuração referente a execução do código no Screeps.
  O resultado desse comando já emitido no console automaticamente
  a cada {IntervalInMinutesToShowDebug} minutos.

# A instância da aplicação está acessível em:
  Game.{GameApplication};
  
  > Game.{GameApplication}.query.getSpawns();
  Retorna a lista dos spawns existentes. 
   
  > Game.{GameApplication}.query.getCreeps();
  Retorna a lista dos screeps existentes.
`
  };
}
