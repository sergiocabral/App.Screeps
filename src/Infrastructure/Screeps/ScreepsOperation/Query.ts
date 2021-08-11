import {
  KeyValue,
  Message,
  ShouldNeverHappenError
} from '@sergiocabral/helper';
import { IScreepsEnvironment } from '../IScreepsEnvironment';
import { BeginExecutionEvent } from '../../Core/Message/BeginExecutionEvent';
import { SendDebugToConsole } from '../../Console/Message/SendDebugToConsole';
import { CreepWrapper } from '../Entity/CreepWrapper';
import { SpawnWrapper } from '../Entity/SpawnWrapper';
import { BaseWrapper } from '../Entity/BaseWrapper';

/**
 * Consulta informações do jogo.
 */
export class Query {
  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  constructor(private screepsEnvironment: IScreepsEnvironment) {
    Message.subscribe(BeginExecutionEvent, () => this.sendDebugToConsole());
  }

  /**
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    const section = 'Screeps';
    new SendDebugToConsole(
      () => 'Count, spawns: {0}',
      () => [this.getSpawns().length],
      section
    ).send();
    new SendDebugToConsole(
      () => 'Count, creeps: {0}',
      () => [this.getCreeps().length],
      section
    ).send();
  }

  /**
   * Retorna a lista dos spawns existentes.
   * @param instances Lista de instâncias do Screeps.
   * @param ctor Constrói um wrapper para a instâncias do Screeps
   * @private
   */
  private getEntity<TScreeps, TWrapper extends BaseWrapper<TScreeps>>(
    instances: KeyValue<TScreeps>,
    ctor: new (
      instance: TScreeps,
      screepsEnvironment: IScreepsEnvironment
    ) => TWrapper
  ): TWrapper[] {
    return Object.keys(instances).map(name => {
      const entity = instances[name];
      if (entity === undefined) throw new ShouldNeverHappenError();
      return new ctor(entity, this.screepsEnvironment);
    });
  }

  /**
   * Retorna a lista dos spawns existentes.
   */
  public getSpawns(): SpawnWrapper[] {
    return this.getEntity<StructureSpawn, SpawnWrapper>(
      this.screepsEnvironment.game.spawns,
      SpawnWrapper
    );
  }

  /**
   * Retorna a lista dos screeps existentes.
   */
  public getCreeps(): CreepWrapper[] {
    return this.getEntity<Creep, CreepWrapper>(
      this.screepsEnvironment.game.creeps,
      CreepWrapper
    );
  }
}
