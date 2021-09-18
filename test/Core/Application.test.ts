/* eslint-disable */

import { Application } from '../../src/Infrastructure/Core/Application';
import { InvalidExecutionError, KeyValue } from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../../src/Infrastructure/Screeps/IScreepsEnvironment';
import { IScreepsOperation } from '../../src/Infrastructure/Screeps/ScreepsOperation/IScreepsOperation';
import { Query } from '../../src/Infrastructure/Screeps/ScreepsOperation/Query/Query';
import { GameBase } from '../../src/Infrastructure/Core/GameBase';

class DummyGame extends GameBase {
  protected override do(): void {}
}

describe('Class Application', () => {
  const originals: KeyValue<any> = {};

  beforeEach(() => {
    originals['Application.uniqueInstance'] = (
      Application as any
    ).uniqueInstance;
  });

  afterEach(() => {
    (Application as any).uniqueInstance =
      originals['Application.uniqueInstance'];
  });

  test('Não deve permitir iniciar a aplicação mais de uma vez', () => {
    // Arrange, Given
    // Act, When

    const instantiate = () => Application.start(new DummyGame());

    // Assert, Then

    expect(instantiate).not.toThrow();
    expect(instantiate).toThrowError(InvalidExecutionError);
  });
  test('implementação de IScreepsEnvironment deve fazer bypass para as variáveis globais', () => {
    // Arrange, Given

    const globals = {
      Game: Game,
      Memory: Memory,
      PathFinder: PathFinder,
      RawMemory: RawMemory
    };

    // Act, When

    Application.start(new DummyGame());
    const instance = (Application as any).uniqueInstance as IScreepsEnvironment;

    // Assert, Then

    expect(instance.game).toBe(globals.Game);
    expect(instance.memory).toBe(globals.Memory);
    expect(instance.pathFinder).toBe(globals.PathFinder);
    expect(instance.rawMemory).toBe(globals.RawMemory);
  });
  test('verifica a implementação de IScreepsOperation', () => {
    // Arrange, Given
    // Act, When

    Application.start(new DummyGame());
    const instance = (Application as any).uniqueInstance as IScreepsOperation;

    // Assert, Then

    expect(instance.query.constructor).toBe(Query);
  });
});
