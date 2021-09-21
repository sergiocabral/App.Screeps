import { IListOfScheduledMessagesType } from './Schedule/IListOfScheduledMessagesType';
import { ShowDebugToConsole } from './Console/Message/ShowDebugToConsole';
import { IConsoleHelpCommands } from './Console/IConsoleHelpCommands';
import { RunGarbageCollector } from './Core/Message/RunGarbageCollector';

/**
 * Conjunto de definições configuráveis
 */
export class Definition {
  /**
   * Versão da aplicação.
   */
  public static readonly Version = 1;

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
   * Propriedade em Memory para: Informações sobre a versão.
   */
  public static readonly MemoryVersionManager = 'version';

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
   * Intervalo entre coleta de lixo.
   */
  public static readonly IntervalInMinutesToGarbageCollector = 30;

  /**
   * Lista dos tipos de mensagens que podem ser agendadas.
   */
  public static readonly ListOfScheduledMessagesType: IListOfScheduledMessagesType =
    {
      scheduledMessageTypes: [ShowDebugToConsole, RunGarbageCollector]
    };

  /**
   * Representação das informações de ajuda para comandos de console.
   */
  public static readonly ConsoleHelpCommand: IConsoleHelpCommands = {
    help: `
# As funcionalidades da aplicação podem ser exploradas digitando no console
  o nome da instância da aplicação: Game.{GameApplication}
  
  ATENÇÃO! Ao chamar métodos via console nenhuma validação de parâmetros é feita,
  o que pode causar em comportamento anormal e inesperado na aplicação. 

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

  > map [roomName]
  Exibe o terreno de uma localização no mapa. O valor para [roomName] deve
  estar no formato: "W0N0", "E0N0", "W0S0", "E0S0". Onde cada posição é: 
  (West-East)(Quadrante West-East)(North-South)(Quadrante North-South)

  > kill [entityType]
  Destrói todas as instâncias da entidade especificada.
  Valores válidos para [entityType]:
    - "creeps"

`
  };
}
