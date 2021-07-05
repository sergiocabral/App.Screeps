import { GameLevel } from "./GameLevel";
import { GameStateFields } from "./GameStateFields";
import { Json } from "../../Common/Helper/Type/Json";

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
   * Valores padrão para um estado vazio.
   * @private
   */
  private static empty: GameState = new GameState();

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
    if (!this.memory) throw Error("Memory is not present.");
    const data = Object.assign({} as Json, this);
    const isEmpty = Object.keys(data).length === 0;
    if (isEmpty) {
      delete this.memory[this.key];
    } else {
      this.memory[this.key] = data;
    }
  }

  /**
   * Nível do jogo.
   */
  public level: GameLevel = GameLevel.Started;
}
