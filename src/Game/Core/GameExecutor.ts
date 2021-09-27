import { GameBase } from '../../Infrastructure/Core/GameBase';
import { FactoryCreep } from '../Screeps/Creep/FactoryCreep';
import { Definition } from './Definition';
import { ConsoleCommandHandler } from './ConsoleCommandHandler';
import { IScreepsOperation } from '../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { IGameExecutor } from './IGameExecutor';
import { ParameterByFlag } from '../Screeps/Flag/ParameterByFlag';
import { Jobs } from '../Screeps/Job/Jobs';

/**
 * Classe base para os modos de operação.
 */
export abstract class GameExecutor extends GameBase implements IGameExecutor {
  /**
   * Contexto do log.
   * @private
   */
  protected _loggerContext = 'GameExecutor';

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
  private _factoryCreepValue: FactoryCreep | undefined = undefined;

  /**
   * Construtor de creeps.
   * @protected
   */
  public get factoryCreep(): FactoryCreep {
    if (this._factoryCreepValue === undefined) {
      this._factoryCreepValue = new FactoryCreep(this.screepsOperation);
    }
    return this._factoryCreepValue;
  }

  /**
   * Leitura de parâmetros através das flags.
   * @private
   */
  private _parameterByFlagValue: ParameterByFlag | undefined = undefined;

  /**
   * Leitura de parâmetros através das flags.
   * @protected
   */
  public get parameterByFlag(): ParameterByFlag {
    if (this._parameterByFlagValue === undefined) {
      this._parameterByFlagValue = new ParameterByFlag(this.screepsOperation);
    }
    return this._parameterByFlagValue;
  }

  /**
   * Ofertas de serviços.
   * @private
   */
  private _jobsValue: Jobs | undefined = undefined;

  /**
   * Ofertas de serviços.
   * @protected
   */
  public get jobs(): Jobs {
    if (this._jobsValue === undefined) {
      this._jobsValue = new Jobs(this.screepsOperation);
    }
    return this._jobsValue;
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
