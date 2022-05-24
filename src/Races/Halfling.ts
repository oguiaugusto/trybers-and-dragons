import Race from './Race';

class Halfling extends Race {
  private _maxLifePoints: number;
  private static instancesCounter = 0;

  constructor(
    name: string,
    dexterity: number,
  ) {
    super(name, dexterity);
    this._maxLifePoints = 60;

    Halfling.instancesCounter += 1;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }

  public static createdRacesInstances(): number {
    return Halfling.instancesCounter;
  }
}

export default Halfling;
