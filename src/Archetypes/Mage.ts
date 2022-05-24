import { EnergyType } from '../Energy';
import Archetype from './Archetype';

class Mage extends Archetype {
  private _energyType: EnergyType;
  private static instancesCounter = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';

    Mage.instancesCounter += 1;
  }
  
  get energyType(): EnergyType { return this._energyType; }

  public static createdArchetypeInstances(): number {
    return Mage.instancesCounter;
  }
}

export default Mage;
