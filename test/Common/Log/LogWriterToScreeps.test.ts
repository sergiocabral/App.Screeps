import { LogWriterToScreeps } from '../../../src/Common/Log/LogWriterToScreeps';

describe('Class LogWriterToScreeps', () => {
  test('Única função de log disponível é console.log', () => {
    // Arrange, Given

    const sut = new LogWriterToScreeps();

    const namesOfLogFunction: ('debug' | 'log' | 'info' | 'warn' | 'error')[] =
      ['debug', 'log', 'info', 'warn', 'error'];
    const functionsOfLogVerified: ((message: string) => void)[] = [];
    const expectedFunctionOfAnyLogType: (message: string) => void = console.log;

    // Act, When

    for (const nameOfLogFunction of namesOfLogFunction) {
      functionsOfLogVerified.push(sut.getConsoleFunction(nameOfLogFunction));
    }

    // Assert, Then

    for (const functionOfLogVerified of functionsOfLogVerified) {
      expect(functionOfLogVerified).toBe(expectedFunctionOfAnyLogType);
    }
  });
});
