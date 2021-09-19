import { IConsoleHelpCommands } from '../Infrastructure/Console/IConsoleHelpCommands';

/**
 * Conjunto de definições configuráveis do jogo
 */
export class GameDefinition {
  /**
   * Representação das informações de ajuda para comandos de console.
   */
  public static readonly ConsoleHelpCommand: IConsoleHelpCommands = {
    help: `
# Comandos do modo de jogo em execução:
  
  > redefine [configuration]
  Redefine configurações com valores padrão.
  Valores válidos para [configuration]:
    - "creeps" : Ajusta as roles de todos os creeps e
                 remove as propriedades.

`
  };
}
