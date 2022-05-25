import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

type MonstersType = Array<SimpleFighter | Fighter | Monster>;

class PVE extends Battle {
  constructor(
    private fighter: Fighter,
    private monsters: MonstersType,
  ) {
    super(fighter);
    this.monsters = monsters;
  }

  private static handleFirstToAttackWinner(firstToAttack: number) {
    return firstToAttack === 1 ? 1 : -1;
  }

  private getMonstersLifePoints() {
    const lifePoints = this.monsters.reduce((totalLifePoints, monster) => (
      totalLifePoints + monster.lifePoints
    ), 0);

    if (lifePoints <= 0) return -1;
    return lifePoints;
  }

  private attackRound(firstToAttack: number) {
    if (firstToAttack === 1) {
      this.monsters.forEach((monster) => {
        this.fighter.attack(monster);
        monster.attack(this.fighter);
      });
    } else {
      this.monsters.forEach((monster) => {
        monster.attack(this.fighter);
        this.fighter.attack(monster);
      });
    }
  }

  private checkFightLoop(initialLP: { p: number, m: number }, round: number) {
    if (
      this.fighter.lifePoints === initialLP.p
      && this.getMonstersLifePoints() === initialLP.m
      && round === 10
    ) {
      return true;
    }
  }

  private getWinner(firstToAttack: number) {
    if (
      this.fighter.lifePoints === -1
      && this.getMonstersLifePoints() === -1
    ) {
      return PVE.handleFirstToAttackWinner(firstToAttack);
    }
    if (this.fighter.lifePoints === -1) {
      return -1;
    }
    return 1;
  }

  fight(): number {
    const playerAndMonstersCanFight = () => !(
      this.fighter.lifePoints === -1 || this.getMonstersLifePoints() === -1
    );
    const firstToAttack = Math.round(Math.random()) + 1;
    const initialLifePoints = {
      p: this.fighter.lifePoints,
      m: this.getMonstersLifePoints(),
    };
    let winner: undefined | number;

    for (let i = 0; playerAndMonstersCanFight(); i += 1) {
      this.attackRound(firstToAttack);

      if (this.checkFightLoop(initialLifePoints, i)) {
        winner = PVE.handleFirstToAttackWinner(firstToAttack); break;
      }
    }

    winner = !winner ? this.getWinner(firstToAttack) : winner;
    return winner;
  }
}

export default PVE;
