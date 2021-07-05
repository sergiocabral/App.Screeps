import { PrimitiveType } from "./PrimitiveType";

/**
 * Representação de uma estrutura JSON.
 */
export interface Json {
  [x: string]: PrimitiveType | Date | Json | (PrimitiveType | Date | Json)[];
}
