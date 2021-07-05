/* eslint-disable id-blacklist */

import { Text } from "../Text";

declare global {
  /**
   * Interface para extender propriedades de String.
   */
  interface String {
    /**
     * Substitui variáveis na string por seus respectivos valores.
     * @param values Opcional. Conjunto de valores para substituição na string.
     */
    querystring(values: any): string;

    /**
     * Substitui todas as ocorrências de uma string.
     * @param search String procurada.
     * @param replacement String de substituição.
     */
    replaceAll(search: string, replacement: string): string;

    /**
     * Escapa uma string para ser usada como literal numa expressão regular.
     */
    escapeRegExp(): string;
  }
}

String.prototype.querystring = function (values: any): string {
  return Text.querystring(String(this), values);
};

if (!String.prototype.replaceAll) {
  // String.prototype.replaceAll não existe no Screeps
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (String.prototype as any).replaceAll = function (search: string, replacement: string): string {
    return Text.replaceAll(String(this), search, replacement);
  };
}

String.prototype.escapeRegExp = function (): string {
  return Text.escapeRegExp(String(this));
};

export {};
