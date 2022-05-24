import Race from './Race';

class Elf extends Race {
  private _maxLifePoints: number;
  private static instancesCounter = 0;

  constructor(
    name: string,
    dexterity: number,
  ) {
    super(name, dexterity);
    this._maxLifePoints = 99;

    Elf.instancesCounter += 1;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }

  public static createdRacesInstances(): number {
    return Elf.instancesCounter;
  }
}

export default Elf;
