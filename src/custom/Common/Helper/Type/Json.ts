import { JsonType } from "./JsonType";

/**
 * Representação de uma estrutura JSON.
 */
export interface Json {
  [x: string]: JsonType | Json | (JsonType | Json)[];
}
