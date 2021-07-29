/* eslint-disable */

import { Configure } from '../../src/Core/Configure';
import { InvalidExecutionError, KeyValue, Logger } from '@sergiocabral/helper';

describe('Class Configure', () => {
  const originals: KeyValue<any> = {};

  beforeEach(() => {
    originals['Logger.defaultLogger'] = Logger.defaultLogger;
  });

  afterEach(() => {
    Logger.defaultLogger = originals['Logger.defaultLogger'];
  });

  test('Não deve permitir instanciar', () => {
    // Arrange, Given
    // Act, When

    const instantiate = () => new Configure();

    // Assert, Then

    expect(instantiate).toThrowError(InvalidExecutionError);
  });

  test('log deve definir um log personalizado', () => {
    // Arrange, Given

    const originalValueForLogger = Logger.defaultLogger;

    // Act, When

    Configure.log();
    const newValueForLogger = Logger.defaultLogger;

    // Assert, Then

    expect(newValueForLogger).not.toBe(originalValueForLogger);
  });
});
