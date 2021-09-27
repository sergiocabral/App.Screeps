import { IScreepsOperation } from '../../../Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { HelperNumeric } from '@sergiocabral/helper';
import { ToText } from '../../../Infrastructure/Helper/ToText';

/**
 * Leitura de parâmetros através das flags.
 */
export class ParameterByFlag {
  /**
   * Construtor.
   * @param screepsOperation
   */
  public constructor(private readonly screepsOperation: IScreepsOperation) {}

  /**
   * Retorna a lista de todos os parâmetros
   */
  public getAll(room: Room): [string, string][] {
    const result = Array<[string, string]>();
    const divider = ':';
    const flags = this.screepsOperation.query.flag.getByRoom.with(room);
    for (const flag of flags) {
      const dividerIndex = (flag.instance.name + divider).indexOf(divider);
      const key = flag.instance.name.substr(0, dividerIndex).trim();
      const value = flag.instance.name.substr(dividerIndex + 1).trim();
      result.push([key, value]);
    }
    return result;
  }

  /**
   * Retorna a lista de valores de parâmetros obtido das flags
   */
  public getValues(room: Room, parameterName: string): string[] {
    return this.getAll(room)
      .filter(parameter => parameter[0] === parameterName)
      .map(parameter => parameter[1])
      .sort((a, b) => {
        return Number.isFinite(a) && Number.isFinite(b)
          ? HelperNumeric.sortCompare(Number(a), Number(b))
          : a.localeCompare(b);
      });
  }

  /**
   * Override para toString().
   */
  public readonly toString = (): string => {
    return ToText.instance(this);
  };
}
