import { InvalidArgumentError } from '@sergiocabral/helper';

//TODO: Mover esse arquivo para a bilbioteca NPM Sceeps.

/**
 * Tipos de terrenos.
 */
export enum TerrainMapType {
  /**
   * Espaço vazio.
   */
  Empty = 0,

  /**
   * Parede.
   */
  Wall = TERRAIN_MASK_WALL,

  /**
   * Pântano.
   */
  Swamp = TERRAIN_MASK_SWAMP,

  /**
   * Lava
   */
  Lava = TERRAIN_MASK_LAVA
}

/**
 * Configuração para desenhar uma mapa.
 */
export class TerrainMapConfiguration {
  /**
   * Construtor.
   * @param empty Espaço vazio.
   * @param wall Parede.
   * @param swamp Pântano.
   * @param lava Lava.
   */
  public constructor(
    public empty: string = '  ',
    public wall: string = '██',
    public swamp: string = '■ ',
    public lava: string = '* '
  ) {}
}

export class TerrainMap {
  /**
   * Construtor.
   * @param location Localização.
   */
  public constructor(public readonly location: string) {
    try {
      this.terrain = new Room.Terrain(location);
    } catch (error: unknown) {
      throw new InvalidArgumentError(
        'Map location "{location}" not found'.querystring({ location }),
        error
      );
    }
  }

  /**
   * Terreno.
   */
  public terrain: RoomTerrain;

  /**
   * Matriz original do mapa.
   */
  private getRawBuffer(): Uint8Array {
    const terrain = this.terrain as unknown as {
      getRawBuffer: () => Uint8Array;
    };
    return terrain.getRawBuffer();
  }

  /**
   * Matriz do mapa.
   * @private
   */
  private getMatrix(): TerrainMapType[][] {
    const width = 50;
    return this.getRawBuffer().reduce((result, code: TerrainMapType) => {
      let currentLine = result[result.length - 1] ?? [];
      if (currentLine.length === width) currentLine = Array<TerrainMapType>();
      if (currentLine.length === 0) result.push(currentLine);
      currentLine.push(code);
      return result;
    }, Array<TerrainMapType[]>());
  }

  /**
   * Retorna uma exibição como texto.
   */
  public getMatrixAsText(configuration?: TerrainMapConfiguration): string {
    configuration = configuration ?? new TerrainMapConfiguration();
    return this.getMatrix()
      .map(terrainType => terrainType.join(' '))
      .join('\n')
      .replaceAll(String(TerrainMapType.Empty), configuration.empty)
      .replaceAll(String(TerrainMapType.Wall), configuration.wall)
      .replaceAll(String(TerrainMapType.Swamp), configuration.swamp)
      .replaceAll(String(TerrainMapType.Lava), configuration.lava);
  }
}
