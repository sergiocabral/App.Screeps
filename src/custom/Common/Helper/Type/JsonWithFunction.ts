import { Json } from "./Json";
import { PrimitiveType } from "./PrimitiveType";

/**
 * Representação de uma estrutura JSON.
 */
export interface JsonWithFunction {
  [x: string]:
    | PrimitiveType
    | Date
    | Json
    | JsonWithFunction
    // eslint-disable-next-line @typescript-eslint/ban-types
    | Function
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (PrimitiveType | Date | Json | JsonWithFunction | Function)[];
}
