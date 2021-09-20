import { MemoryHandler } from './MemoryHandler';
import { VersionManagerData } from './VersionManagerData';
import { Logger, LogLevel, Message } from '@sergiocabral/helper';
import { BeginExecutionEvent } from './Message/BeginExecutionEvent';
import { SendDebugToConsole } from '../Console/Message/SendDebugToConsole';
import { Definition } from '../Definition';
import { VersionReleasedEvent } from './Message/VersionReleasedEvent';

/**
 * Gerenciador de informações relacionadas a versão.
 */
export class VersionManager
  extends MemoryHandler<VersionManagerData>
  implements VersionManagerData
{
  /**
   * Seção para identifcar mensagens de log.
   * @private
   */
  private static readonly LoggerSection = 'Version';

  /**
   * Construtor.
   * @param memory Objeto que servirá de fonte de dados.
   * @param propertyName Nome da propriedade que será ouvida.
   */
  public constructor(memory: Memory, propertyName: string) {
    super(memory, propertyName, () => {
      return {
        major: 0,
        build: 0,
        hash: '',
        updated: 0
      };
    });

    this.beforeVersion = {
      major: this.source.major,
      build: this.source.build,
      hash: this.source.hash,
      updated: this.source.updated
    };

    this.source.major = Definition.Version;
    this.source.build = Number('{BUILD_NUMBER}' as unknown as number);
    this.source.hash = '{BUILD_HASH}';

    Message.subscribe(
      BeginExecutionEvent,
      this.handleBeginExecutionEvent.bind(this)
    );
  }

  /**
   * Versão anterior.
   * @private
   */
  private beforeVersion: VersionManagerData;

  /**
   * Major da versão.
   */
  public get major(): number {
    return this.source.major;
  }

  /**
   * Número do build.
   */
  public get build(): number {
    return this.source.build;
  }

  /**
   * Hash do build.
   */
  public get hash(): string {
    return this.source.hash;
  }

  /**
   * Momento da atualização.
   */
  public get updated(): number {
    return this.source.updated;
  }

  /**
   *Mensagem: BeginExecutionEvent
   * @private
   */
  private handleBeginExecutionEvent(): void {
    if (this.source.hash !== this.beforeVersion.hash) {
      const currentTime = new Date().getTime();
      const lastUpdated = this.updated;
      const isFirstPublish = !(lastUpdated > 0);
      const elapsedTime = isFirstPublish ? 0 : currentTime - lastUpdated;

      this.source.updated = currentTime;

      new VersionReleasedEvent(
        this.major,
        this.build,
        this.hash,
        elapsedTime
      ).send();

      if (isFirstPublish) {
        Logger.post(
          'First published version {major}.{build}.',
          { major: this.major, build: this.build },
          LogLevel.Information,
          VersionManager.LoggerSection
        );
        Logger.post(
          'Hash of version {hash}.',
          { hash: this.hash },
          LogLevel.Verbose,
          VersionManager.LoggerSection
        );
      } else {
        Logger.post(
          'Updated version from {beforeMajor}.{beforeBuild} to {major}.{build}.',
          {
            beforeMajor: this.beforeVersion.major,
            beforeBuild: this.beforeVersion.build,
            major: this.major,
            build: this.build
          },
          LogLevel.Information,
          VersionManager.LoggerSection
        );
        Logger.post(
          'Hash of version changed from {beforeHash} to {hash}.',
          {
            beforeHash: this.beforeVersion.hash,
            hash: this.hash
          },
          LogLevel.Verbose,
          VersionManager.LoggerSection
        );
        Logger.post(
          'Time elapsed between version updates: {elapsedTime}',
          {
            elapsedTime: new Date(elapsedTime).format({ mask: 'running' })
          },
          LogLevel.Verbose,
          VersionManager.LoggerSection
        );
      }
    }
    this.sendDebugToConsole();
  }

  /**
   * Envia uma mensagem de log tipo debug para o console.
   * @private
   */
  private sendDebugToConsole(): void {
    new SendDebugToConsole(
      () => 'Number: {major}.{build}',
      () => {
        return { major: this.major, build: this.build };
      },
      VersionManager.LoggerSection
    ).send();
    new SendDebugToConsole(
      () => 'Hash: {hash}',
      () => {
        return { hash: this.hash };
      },
      VersionManager.LoggerSection
    ).send();
    new SendDebugToConsole(
      () => 'Date: {datetime}',
      () => {
        return {
          datetime: new Date(this.updated).format({ mask: 'y-M-d' })
        };
      },
      VersionManager.LoggerSection
    ).send();
    new SendDebugToConsole(
      () => 'Usage time: {elapsedTime}',
      () => {
        return {
          elapsedTime: new Date(new Date().getTime() - this.updated).format({
            mask: 'running'
          })
        };
      },
      VersionManager.LoggerSection
    ).send();
  }
}
