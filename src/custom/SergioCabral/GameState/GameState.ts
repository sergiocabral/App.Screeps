import { GameError } from "../../Common/Error/GameError";
import { GameLevel } from "./GameLevel";
import { GameStateFields } from "./GameStateFields";
import { Json } from "../../Common/Helper/Type/Json";
import { LogLevel } from "../../Common/Log/LogLevel";
import { Logger } from "../../Common/Log/Logger";

/**
 * Gerenciamento do estado do jogo em memória.
 */
export class GameState implements GameStateFields {
  /**
   * Construtor.
   * @param memory Objeto JSON para armazenamento.
   * @param key Nome da propriedade no objeto.
   */
  public constructor(private memory?: Json, private key: string = "MyGameState") {
    this.reload();
  }

  /**
   * Retorna uma instância de GameState apenas com os campos.
   * @param gameState
   * @private
   */
  private static getOnlyGameStateFields(gameState: GameState): GameState {
    const clone = Object.assign({}, gameState);
    delete clone.memory;
    delete clone.key;
    return clone;
  }

  /**
   * Instância padrão.
   */
  public static default: GameState = new GameState();

  /**
   * Valores padrão para um estado vazio.
   * @private
   */
  private static empty: GameState = GameState.getOnlyGameStateFields(GameState.default);

  /**
   * Recarrega os dados da memória.
   */
  public reload(): void {
    if (!this.memory) return;
    const data = this.memory[this.key];
    const isEmpty = !data || Object.keys(data).length === 0;
    if (isEmpty) {
      Object.assign(this, GameState.empty);
    } else {
      Object.assign(this, data);
    }
  }

  /**
   * Grava os dados na memória.
   */
  public save(): void {
    if (!this.memory) throw new GameError("Memory is not present.");
    const data = Object.assign({} as Json, GameState.getOnlyGameStateFields(this));
    const isEmpty = Object.keys(data).length === 0;
    if (isEmpty) {
      delete this.memory[this.key];
    } else {
      this.memory[this.key] = data;
    }
    Logger.post("Game state saved: {json}", { json: JSON.stringify(this.memory) }, LogLevel.Verbose);
  }

  /**
   * Nível de exibição de log.
   */
  public logLevel: LogLevel = LogLevel.Information;

  /**
   * Tick do meu jogo.
   */
  public tick = 0;

  /**
   * Nível do jogo.
   */
  public level: GameLevel = GameLevel.Started;

  /**
   * Etapa do nível.
   */
  public levelStep = 0;
}
