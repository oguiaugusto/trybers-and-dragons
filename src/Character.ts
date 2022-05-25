import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _name: string;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._name = name;
    this._race = new Elf(name, 10);
    this._archetype = new Mage(name);

    this._maxLifePoints = Math.floor(this._race.maxLifePoints / 2);
    this._lifePoints = this._maxLifePoints;

    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);

    this._dexterity = this._race.dexterity;
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get name() { return this._name; }
  get race() { return this._race; }
  get archetype() { return this._archetype; }
  get lifePoints() { return this._lifePoints; }
  get strength() { return this._strength; }
  get defense() { return this._defense; }
  get dexterity() { return this._dexterity; }
  get energy() {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  public receiveDamage(attackPoints: number) {
    const damage = attackPoints - this.defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this.lifePoints;
  }

  public attack(enemy: SimpleFighter) {
    enemy.receiveDamage(this.strength);
  }

  public levelUp() {
    const maxLifeUp = getRandomInt(1, 10);
    if ((this._maxLifePoints + maxLifeUp) >= this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    } else {
      this._maxLifePoints += getRandomInt(1, 10);
    }

    this._lifePoints = this._maxLifePoints;
    this._defense += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);

    this._energy.amount = 10;
  }

  public special(enemy: SimpleFighter) {
    enemy.receiveDamage(this.strength * 2);
  }
}

export default Character;
