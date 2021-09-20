import { GameBase } from '../../Infrastructure/Core/GameBase';
import { FactoryCreep } from '../Screeps/Creep/FactoryCreep';
import { GameDefinition } from './GameDefinition';
import { GameConsoleCommandHandler } from './GameConsoleCommandHandler';
import { IScreepsOperation } from '../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { IGameMode } from './IGameMode';

/**
 * Classe base para os modos de operação.
 */
export abstract class GameMode extends GameBase implements IGameMode {
  /**
   * Inicializa a classe.
   * @param screepsOperation
   * @private
   */
  protected override initialize(screepsOperation: IScreepsOperation): void {
    super.initialize(screepsOperation);
    void new GameConsoleCommandHandler(this.screepsOperation, this);
  }

  /**
   * Construtor de creeps.
   * @private
   */
  private factoryCreepValue: FactoryCreep | undefined = undefined;

  /**
   * Construtor de creeps.
   * @protected
   */
  public get factoryCreep(): FactoryCreep {
    if (this.factoryCreepValue === undefined) {
      this.factoryCreepValue = new FactoryCreep(this.screepsOperation);
    }
    return this.factoryCreepValue;
  }

  /**
   * Ajuda para os comandos.
   */
  public override get help(): string[] | string {
    const help = Array.isArray(super.help) ? super.help : [super.help];
    help.push(
      ...(Array.isArray(GameDefinition.ConsoleHelpCommand.help)
        ? GameDefinition.ConsoleHelpCommand.help
        : [GameDefinition.ConsoleHelpCommand.help])
    );
    help.push(`# Modo atual do jogo: ${this.description}`);
    return help;
  }

  /**
   * Descrição do modo do jogo.
   */
  protected abstract get description(): string;
}
