import { JsonType } from "./JsonType";

/**
 * Representação de uma estrutura JSON.
 */
export interface JsonWithFunction {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [x: string]: JsonType | JsonWithFunction | Function | (JsonType | JsonWithFunction | Function)[];
}
