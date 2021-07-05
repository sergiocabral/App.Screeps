/**
 * Valores aleatórios
 */
import { List } from "../Common/Helper/List";

export abstract class NameGenerator {
  /**
   * Meus identificadores.
   * @private
   */
  private static myNames: string[] = [
    "Cabrones",
    "Cabron",
    "Cabran",
    "Cabruts",
    "Cabrin",
    "Cabré",
    "Cabrata",
    "Cabrini",
    "Cabrão"
  ];

  /**
   * Nomes de minerais.
   * @private
   */
  private static minerals: string[] = [
    "Fluorite",
    "Gold",
    "Halite",
    "Iron",
    "Lithium",
    "Manganese",
    "Mica",
    "Nickel",
    "Pyrite",
    "Quartz",
    "Silica",
    "Silver",
    "Tantalum",
    "Tungsten",
    "Gypsum",
    "Copper",
    "Zinc"
  ];

  /**
   * Nomes de ~constelações.
   * @private
   */
  private static constellations: string[] = [
    "Andromeda",
    "Antlia",
    "Apus",
    "Aquarius",
    "Aquila",
    "Ara",
    "Aries",
    "Auriga",
    "Bootes",
    "Caelum",
    "Camelopardalis",
    "Cancer",
    "Canes",
    "Venatici",
    "Canis",
    "Major",
    "Canis",
    "Minor",
    "Capricornus",
    "Carina",
    "Cassiopeia",
    "Centaurus",
    "Cepheus",
    "Cetus",
    "Chamaeleon",
    "Circinus",
    "Columba",
    "Coma",
    "Berenices",
    "Corona",
    "Australis",
    "Corona",
    "Borealis",
    "Corvus",
    "Crater",
    "Crux",
    "Cygnus",
    "Delphinus",
    "Dorado",
    "Draco",
    "Equuleus",
    "Eridanus",
    "Fornax",
    "Gemini",
    "Grus",
    "Hercules",
    "Horologium",
    "Hydra",
    "Hydrus",
    "Indus",
    "Lacerta",
    "Leo",
    "Leo",
    "Minor",
    "Lepus",
    "Libra",
    "Lupus",
    "Lynx",
    "Lyra",
    "Mensa",
    "Microscopium",
    "Monoceros",
    "Musca",
    "Norma",
    "Octans",
    "Ophiuchus",
    "Orion",
    "Pavo",
    "Pegasus",
    "Perseus",
    "Phoenix",
    "Pictor",
    "Pisces",
    "Piscis",
    "Austrinus",
    "Puppis",
    "Pyxis",
    "Reticulum",
    "Sagitta",
    "Sagittarius",
    "Scorpius",
    "Sculptor",
    "Scutum",
    "Serpens",
    "Sextans",
    "Taurus",
    "Telescopium",
    "Triangulum",
    "Triangulum",
    "Australe",
    "Tucana",
    "Ursa",
    "Major",
    "Ursa",
    "Minor",
    "Vela",
    "Virgo",
    "Volans",
    "Vulpecula"
  ];

  /**
   * Nomes utilizados.
   * @private
   */
  private static inUse: string[] = [];

  /**
   * Monta um nome
   * @param list
   * @private
   */
  private static factoryName(list: string[]): string {
    let name: string;
    do {
      name = `${List.getRandom(list)} ${List.getRandom(this.myNames)}`.trim();
    } while (this.inUse.includes(name));
    this.inUse.push(name);
    return name;
  }

  /**
   * Nome áleatório para um Spawn
   */
  public static get spawn(): string {
    return this.factoryName(this.minerals);
  }

  /**
   * Nome áleatório para um Creep.
   */
  public static get creep(): string {
    return this.factoryName(this.constellations);
  }
}
