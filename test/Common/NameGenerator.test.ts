import { NameGenerator } from '../../src/Common/NameGenerator';
import { InvalidExecutionError } from '@sergiocabral/helper';

describe('Classe NameGenerator', () => {
  test('Não deve permitir instanciar', () => {
    // Arrange, Given
    // Act, When

    const instantiate = () => new NameGenerator();

    // Assert, Then

    expect(instantiate).toThrowError(InvalidExecutionError);
  });
  test('Deve retorna um nome aleatório', () => {
    // Arrange, Given
    // Act, When

    const minimumNameLength = 2;

    const name1 = NameGenerator.firstName;
    const name2 = NameGenerator.firstName;

    // Assert, Then

    expect(name1.length).toBeGreaterThanOrEqual(minimumNameLength);
    expect(name2.length).toBeGreaterThanOrEqual(minimumNameLength);
    expect(name1).not.toBe(name2);
  });
  test('Deve retorna um nome e sobrenome aleatório', () => {
    // Arrange, Given
    // Act, When

    const minimumNameLength = 4;

    const name1 = NameGenerator.firstAndLastName;
    const name2 = NameGenerator.firstAndLastName;

    // Assert, Then

    expect(name1.length).toBeGreaterThan(minimumNameLength * 2);
    expect(name2.length).toBeGreaterThan(minimumNameLength * 2);
    expect(name1).toContain(' ');
    expect(name2).toContain(' ');
    expect(name1).not.toBe(name2);
  });
  test('Nome e sobrenome devem ter comprimentos diferentes', () => {
    // Arrange, Given

    const sampleCount = 100;
    const names: string[] = [];

    // Act, When

    for (let i = 0; i < sampleCount; i++) {
      names.push(NameGenerator.firstAndLastName);
    }

    // Assert, Then

    const firstAndLastName = names.map(firstAndLastName =>
      firstAndLastName.split(' ')
    );
    const firstAndLastNameLength = firstAndLastName.map(names =>
      names.map(name => name.length)
    );
    const firstAndLastNameLengthVerification = firstAndLastNameLength.map(
      lengths => Number(lengths[0]) - Number(lengths[1])
    );

    expect(firstAndLastNameLengthVerification).not.toContain(0);
  });
});
