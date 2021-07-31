/* eslint-disable */

import { Application } from '../../src/Core/Application';
import { InvalidExecutionError, KeyValue } from '@sergiocabral/helper';
import { FactoryGame } from '../../src/Screeps/FactoryGame';
import { IScreepsEnvironment } from '../../src/Core/IScreepsEnvironment';
import { IScreepsOperation } from '../../src/Core/IScreepsOperation';
import { Query } from '../../src/Screeps/Query';

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

    FactoryGame.create = jest.fn().mockReturnValue({ loop: () => {} });

    // Act, When

    const instantiate = () => Application.start('Basic');

    // Assert, Then

    expect(instantiate).not.toThrow();
    expect(instantiate).toThrowError(InvalidExecutionError);
  });
  test('implementação de IScreepsEnvironment deve fazer bypass para as variáveis globais', () => {
    // Arrange, Given

    const globals = {
      Game: Game,
      InterShardMemory: InterShardMemory,
      Memory: Memory,
      PathFinder: PathFinder,
      RawMemory: RawMemory
    };

    FactoryGame.create = jest.fn().mockReturnValue({ loop: () => {} });

    // Act, When

    Application.start('Basic');
    const instance = (Application as any).uniqueInstance as IScreepsEnvironment;

    // Assert, Then

    expect(instance.game).toBe(globals.Game);
    expect(instance.interShardMemory).toBe(globals.InterShardMemory);
    expect(instance.memory).toBe(globals.Memory);
    expect(instance.pathFinder).toBe(globals.PathFinder);
    expect(instance.rawMemory).toBe(globals.RawMemory);
  });
  test('verifica a implementação de IScreepsOperation', () => {
    // Arrange, Given

    FactoryGame.create = jest.fn().mockReturnValue({ loop: () => {} });

    // Act, When

    Application.start('Basic');
    const instance = (Application as any).uniqueInstance as IScreepsOperation;

    // Assert, Then

    expect(instance.query.constructor).toBe(Query);
  });
});
