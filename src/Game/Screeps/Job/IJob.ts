/**
 * Trabalho disponível para ser realizado.
 */
export interface IJob {
  /**
   * Verifica se tem trabalho para um creep em uma sala.
   */
  isAvailable(room: Room, creep: Creep): boolean;
}
