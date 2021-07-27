import { ExampleClass } from '../src/ExampleClass';

describe('Teste da classe ExampleClass', () => {
  test('Exemplificando teste unitário', () => {
    // Arrange, Given
    const instance = new ExampleClass();
    // Act, When
    const randomValue1 = instance.getRandomValue();
    const randomValue2 = instance.getRandomValue();
    // Assert, Then
    expect(randomValue1).not.toBe(randomValue2);
  });
});
