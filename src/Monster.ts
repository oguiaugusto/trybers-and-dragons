import { SimpleFighter } from './Fighter';

class Monster implements SimpleFighter {
  private _lifePoints: number;
  private _strength: number;

  constructor() {
    this._lifePoints = 85;
    this._strength = 63;
  }

  get lifePoints() { return this._lifePoints; }
  get strength() { return this._strength; }

  public receiveDamage(attackPoints: number) {
    const damage = attackPoints;
    if (damage > 0) this._lifePoints -= damage;

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this.lifePoints;
  }

  public attack(enemy: SimpleFighter) {
    enemy.receiveDamage(this.strength);
  }
}

export default Monster;
