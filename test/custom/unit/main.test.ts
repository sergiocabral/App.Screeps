import { Game } from "../../unit/mock";
import { Main } from "../../../src/custom/Main";
import { assert } from "chai";

describe("main", () => {
  beforeEach(() => {
    // Executa antes de cada teste neste bloco.
    global.Game = _.clone(Game) as Game;
  });

  it("Main must provide an instance", () => {
    // Arrange, Given
    // Act, When

    const instance = Main.instance;

    // Assert, Then

    assert.isDefined(instance);
  });

  it("Main must provide an instance as Singleton pattern", () => {
    // Arrange, Given
    // Act, When

    const instance1 = Main.instance;
    const instance2 = Main.instance;

    // Assert, Then

    assert.isTrue(instance1 === instance2);
  });

  it("The provided instance must have a loop function", () => {
    // Arrange, Given
    // Act, When

    const instance = Main.instance;

    // Assert, Then

    assert.isTrue(typeof instance.loop === "function");
  });
});
