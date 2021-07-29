import {
  HelperNumeric,
  InvalidExecutionError,
  WordGenerator
} from '@sergiocabral/helper';

/**
 * Gerador de nomes aleatórios.
 */
export class NameGenerator {
  /**
   * Construtor proibido.
   */
  constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }

  /**
   * Um nome aleatório.
   */
  public static get firstName(): string {
    const minimumSyllables = 1;
    const maximumSyllables = 3;
    const syllableCount = HelperNumeric.between(
      minimumSyllables,
      maximumSyllables
    );
    return WordGenerator.getWord(syllableCount);
  }

  /**
   * Dois nomes aleatórios, como nome e sobrenome.
   */
  public static get firstAndLastName(): string {
    const firstName = this.firstName;
    let lastName: string;
    do {
      lastName = this.firstName;
    } while (firstName.length === lastName.length);
    return `${firstName} ${lastName}`;
  }
}
