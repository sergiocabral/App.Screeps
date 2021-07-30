/* eslint-disable */

import { Application } from '../../src/Core/Application';
import { InvalidExecutionError, KeyValue } from '@sergiocabral/helper';
import { FactoryGame } from '../../src/Screeps/FactoryGame';

describe('Class Application', () => {
  const originals: KeyValue<any> = {};

  beforeEach(() => {
    originals['Application.uniqueInstance'] = (
      Application as any
    ).uniqueInstance;
    originals['FactoryGame.create'] = FactoryGame.create;
  });

  afterEach(() => {
    (Application as any).uniqueInstance =
      originals['Application.uniqueInstance'];
    FactoryGame.create = originals['FactoryGame.create'];
  });

  test('Não deve permitir iniciar a aplicação mais de uma vez', () => {
    // Arrange, Given

    const mockFactoryGameCreate = jest.fn();
    mockFactoryGameCreate.mockReturnValue({ loop: () => {}});
    FactoryGame.create = mockFactoryGameCreate;

    // Act, When

    const instantiate = () => Application.start('Basic');

    // Assert, Then

    expect(instantiate).not.toThrow();
    expect(instantiate).toThrowError(InvalidExecutionError);
  });
});
