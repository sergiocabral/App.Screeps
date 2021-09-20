/**
 * Utilitários para verificação da propriedade identificadora de instãncias.
 */
import { InvalidExecutionError } from '@sergiocabral/helper';
import { PropertyIdentifier } from '../../Type/PropertyIdentifier';
import { WithName } from '../../Type/WithName';
import { WithId } from '../../Type/WithId';

export class IdentifyIdentifier {
  /**
   * Construtor.
   */
  public constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }

  /**
   * Determina a propriedade de identificação da instância do Screeps.
   * @param instance
   */
  public static verify(instance: unknown): PropertyIdentifier[] {
    const result: PropertyIdentifier[] = [];
    if (instance !== undefined) {
      if ((instance as WithName).name !== undefined) {
        result.push(PropertyIdentifier.Name);
      }
      if ((instance as WithId).id !== undefined) {
        result.push(PropertyIdentifier.Id);
      }
    }
    return result;
  }
}
