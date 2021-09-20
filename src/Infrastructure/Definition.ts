import { IListOfScheduledMessagesType } from './Schedule/IListOfScheduledMessagesType';
import { ShowDebugToConsole } from './Console/Message/ShowDebugToConsole';
import { IConsoleHelpCommands } from './Console/IConsoleHelpCommands';

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
# A instância da aplicação está acessível em:
  Game.{GameApplication};
  
  > Game.{GameApplication}.query.creep.getAll();
  > Game.{GameApplication}.query.creep.filter(filter, list);
  > Game.{GameApplication}.query.creep.getById.with(...ids);
  > Game.{GameApplication}.query.creep.getById.without(...ids);
  > Game.{GameApplication}.query.creep.getByName.with(...names);
  > Game.{GameApplication}.query.creep.getByName.without(...names);
  > Game.{GameApplication}.query.creep.getByRoom.with(...rooms);
  > Game.{GameApplication}.query.creep.getByRoom.without(...rooms);
  > Game.{GameApplication}.query.creep.getByRole.with(...roles);
  > Game.{GameApplication}.query.creep.getByRole.without(...roles);
  > Game.{GameApplication}.query.creep.getByProperty.with(...properties);
  > Game.{GameApplication}.query.creep.getByProperty.without(...properties);
  > Game.{GameApplication}.query.creep.getByProperty.withValue(property, ...values);
  > Game.{GameApplication}.query.creep.getByProperty.withoutValue(property, ...values);

  > Game.{GameApplication}.query.spawn.getAll();
  > Game.{GameApplication}.query.spawn.filter(filter, list);
  > Game.{GameApplication}.query.spawn.getById.with(...ids);
  > Game.{GameApplication}.query.spawn.getById.without(...ids);
  > Game.{GameApplication}.query.spawn.getByName.with(...names);
  > Game.{GameApplication}.query.spawn.getByName.without(...names);
  > Game.{GameApplication}.query.spawn.getByRole.with(...roles);
  > Game.{GameApplication}.query.spawn.getByRole.without(...roles);
  > Game.{GameApplication}.query.spawn.getByProperty.with(...properties);
  > Game.{GameApplication}.query.spawn.getByProperty.without(...properties);
  > Game.{GameApplication}.query.spawn.getByProperty.withValue(property, ...values);
  > Game.{GameApplication}.query.spawn.getByProperty.withoutValue(property, ...values);

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
