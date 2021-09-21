import { GameBase } from '../../Infrastructure/Core/GameBase';
import { FactoryCreep } from '../Screeps/Creep/FactoryCreep';
import { Definition } from './Definition';
import { ConsoleCommandHandler } from './ConsoleCommandHandler';
import { IScreepsOperation } from '../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { IGameExecutor } from './IGameExecutor';
import { Message } from '@sergiocabral/helper';
import { VersionReleasedEvent } from '../../Infrastructure/Core/Message/VersionReleasedEvent';
import { DebugStepByStep } from '../../Infrastructure/Type/DebugStepByStep';

/**
 * Classe base para os modos de operação.
 */
export abstract class GameExecutor extends GameBase implements IGameExecutor {
  /**
   * Construtor.
   * @param debug Modo de debug durante o loop.
   */
  public constructor(debug?: DebugStepByStep) {
    super(debug);
    Message.subscribe(
      VersionReleasedEvent,
      this._handleVersionReleasedEvent.bind(this)
    );
  }

  /**
   * Mensagem: VersionReleasedEvent
   * @private
   */
  private _handleVersionReleasedEvent(): void {
    this.factoryCreep.redefine(...this.screepsOperation.query.creep.getAll());
  }

  /**
   * Inicializa a classe.
   * @param screepsOperation
   * @private
   */
  protected override initialize(screepsOperation: IScreepsOperation): void {
    super.initialize(screepsOperation);
    void new ConsoleCommandHandler(this.screepsOperation, this);
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
      ...(Array.isArray(Definition.ConsoleHelpCommand.help)
        ? Definition.ConsoleHelpCommand.help
        : [Definition.ConsoleHelpCommand.help])
    );
    help.push(`# Modo atual do jogo: ${this.description}`);
    return help;
  }

  /**
   * Descrição do modo do jogo.
   */
  protected abstract get description(): string;
}
