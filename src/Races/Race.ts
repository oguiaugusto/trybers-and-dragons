abstract class Race {
  constructor(
    private readonly _name: string,
    private readonly _dexterity: number,
  ) {
    this._name = _name;
    this._dexterity = _dexterity;
  }

  public get name() { return this._name; }
  public get dexterity() { return this._dexterity; }

  public static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }

  abstract get maxLifePoints(): number;
}

export default Race;
