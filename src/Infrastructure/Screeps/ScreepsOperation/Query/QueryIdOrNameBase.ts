import { QueryBase } from './QueryBase';
import { IScreepsEnvironment } from '../../IScreepsEnvironment';
import { WrapperRolesAndPropertiesBase } from '../../Wrapper/WrapperIdOrNamedBase';
import { WithName } from '../../../Type/WithName';
import { WithId } from '../../../Type/WithId';
import { TemplateFilterWithId } from './Filter/TemplateFilterWithId';
import { TemplateFilterWithName } from './Filter/TemplateFilterWithName';
import { FilterMatchIdOrName } from './FilterMatch/FilterMatchIdOrName';
import { FilterMatchProperties } from './FilterMatch/FilterMatchProperties';
import { GetByRole } from './GetBy/GetByRole';
import { GetByProperty } from './GetBy/GetByProperty';
import { TemplateFilterWithRoles } from './Filter/TemplateFilterWithRoles';
import { TemplateFilterWithProperties } from './Filter/TemplateFilterWithProperties';
import { FilterMatchRoles } from './FilterMatch/FilterMatchRoles';
import { HelperObject, Logger, LogLevel, Message } from '@sergiocabral/helper';
import { RunGarbageCollector } from '../../../Core/Message/RunGarbageCollector';

/**
 * Classe para consultar de entidades: com id ou nome
 */
export abstract class QueryIdOrNameBase<
  TScreeps extends WithName | WithId,
  TWrapper extends WrapperRolesAndPropertiesBase<TScreeps>,
  TQueryFilter extends (TemplateFilterWithId | TemplateFilterWithName) &
    TemplateFilterWithRoles &
    TemplateFilterWithProperties,
  TPreFilter = undefined
> extends QueryBase<TScreeps, TWrapper, TQueryFilter, TPreFilter> {
  /**
   * Seção do log.
   * @private
   */
  private static loggerSection = 'QueryIdOrNameBase';

  /**
   * Construtor.
   * @param screepsEnvironment Disponibiliza objetos do ambiente do Screeps
   */
  public constructor(screepsEnvironment: IScreepsEnvironment) {
    super(screepsEnvironment);
    this.filters.push(
      new FilterMatchIdOrName<TScreeps, TWrapper, TQueryFilter>()
    );
    this.filters.push(new FilterMatchRoles<TScreeps, TWrapper, TQueryFilter>());
    this.filters.push(
      new FilterMatchProperties<TScreeps, TWrapper, TQueryFilter>()
    );

    Message.subscribe(
      RunGarbageCollector,
      this.handleRunGarbageCollector.bind(this)
    );
  }

  /**
   * Nome da entrada na memória para a limpeza de lixo.
   * @protected
   */
  protected memoryEntryForGarbageCollector = Array<string>();

  /**
   * Mensagem: RunGarbageCollector
   * @private
   */
  private handleRunGarbageCollector() {
    if (this.memoryEntryForGarbageCollector.length === 0) return;
    for (const entryName of this.memoryEntryForGarbageCollector) {
      const getRecord = (
        source: unknown
      ): Record<string, unknown> | undefined => {
        const instances = (source as Record<string, Record<string, unknown>>)[
          entryName
        ];
        return typeof instances === 'object' && instances
          ? instances
          : undefined;
      };

      const source = getRecord(this.screepsEnvironment.game);
      const memory = getRecord(this.screepsEnvironment.memory);

      if (!source || !memory) return;

      const sourceKeys = Object.keys(source);

      const disposeKeys = Array<string>();
      let totalBytes = 0;
      for (const memoryKey of Object.keys(memory)) {
        if (sourceKeys.includes(memoryKey)) continue;

        Logger.post(
          'Discarded {bytes} bytes of entry in Memory["{entryName}"]["{memoryKey}"]:\n{json}',
          () => {
            const data: Record<string, unknown> = {};
            data[memoryKey] = memory[memoryKey];
            const json = HelperObject.toText(data);
            const bytes = JSON.stringify(data).length;
            totalBytes += bytes;
            return {
              bytes: bytes.format({ digits: 0 }),
              entryName,
              memoryKey,
              json
            };
          },
          LogLevel.Verbose,
          QueryIdOrNameBase.loggerSection
        );
        delete memory[memoryKey];
        disposeKeys.push(memoryKey);
      }

      if (disposeKeys.length > 0) {
        Logger.post(
          'A total of {totalBytes} bytes were discarded by entry in Memory["{entryName}"].',
          () => {
            return {
              totalBytes: totalBytes.format({ digits: 0 }),
              entryName
            };
          },
          LogLevel.Verbose,
          QueryIdOrNameBase.loggerSection
        );

        Logger.post(
          '{disposeKeysCount} entry(ies) discarded in Memory["{entryName}"]: {disposeKeys}',
          {
            disposeKeysCount: disposeKeys.length,
            entryName,
            disposeKeys: disposeKeys.map(key => `"${key}"`).join(', ')
          },
          LogLevel.Debug,
          QueryIdOrNameBase.loggerSection
        );
      }

      if (Object.keys(memory).length === 0) {
        Logger.post(
          'Discard empty entry in Memory["{entryName}"].',
          { entryName },
          LogLevel.Debug,
          QueryIdOrNameBase.loggerSection
        );

        delete (
          this.screepsEnvironment.memory as unknown as Record<string, unknown>
        )[entryName];
      }
    }
  }

  /**
   * Consulta por: role
   */
  public readonly getByRole = new GetByRole(this);

  /**
   * Consulta por: propriedades
   */
  public readonly getByProperty = new GetByProperty(this);
}
