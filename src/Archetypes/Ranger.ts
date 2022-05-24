import { EnergyType } from '../Energy';
import Archetype from './Archetype';

class Ranger extends Archetype {
  private _energyType: EnergyType;
  private static instancesCounter = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';

    Ranger.instancesCounter += 1;
  }
  
  get energyType(): EnergyType { return this._energyType; }

  public static createdArchetypeInstances(): number {
    return Ranger.instancesCounter;
  }
}

export default Ranger;
