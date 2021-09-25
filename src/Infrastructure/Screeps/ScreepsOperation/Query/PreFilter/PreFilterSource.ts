/**
 * Pré-filtro para consulta de: Source
 */
export type PreFilterSource = {
  /**
   * Sala.
   */
  room?: Room;

  /**
   * Apenas fontes com energia disponível.
   */
  onlyActives: boolean;
};
