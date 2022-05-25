import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  constructor(
    private player1: Fighter,
    private player2: Fighter,
  ) {
    super(player1);
    this.player2 = player2;
  }

  private handleWinnerAsFirstAttacker(
    firstPlayerToAttack: number,
    looped?: boolean,
  ) {
    if (looped) {
      if (firstPlayerToAttack === 1) {
        this.player2.kill?.();
      } else {
        this.player1.kill?.();
      }
    }
    return firstPlayerToAttack === 1 ? 1 : -1;
  }

  private attackRound(firstPlayerToAttack: number) {
    if (firstPlayerToAttack === 1) {
      this.player1.attack(this.player2);
      if (this.player2.lifePoints === -1) return;
      this.player2.attack(this.player1);

      return;
    }
    // I couldn't put an else here because of cognitive complexity

    this.player2.attack(this.player1);
    if (this.player1.lifePoints === -1) return;
    this.player1.attack(this.player2);
  }

  private checkFightLoop(initialLP: { p1: number, p2: number }, round: number) {
    if (
      this.player1.lifePoints === initialLP.p1
      && this.player2.lifePoints === initialLP.p2
      && round === 10
    ) {
      return true;
    }
  }

  private getWinner(firstPlayerToAttack: number) {
    if (this.player1.lifePoints === -1 && this.player2.lifePoints === -1) {
      return this.handleWinnerAsFirstAttacker(firstPlayerToAttack);
    }
    if (this.player1.lifePoints === -1) {
      return -1;
    }
    return 1;
  }

  fight(): number {
    const playersCanFight = () => !(
      this.player1.lifePoints === -1 || this.player2.lifePoints === -1
    );
    const firstPlayerToAttack = Math.round(Math.random()) + 1;
    const initialLifePoints = {
      p1: this.player1.lifePoints,
      p2: this.player2.lifePoints,
    };
    let winner: undefined | number;

    for (let i = 0; playersCanFight(); i += 1) {
      this.attackRound(firstPlayerToAttack);

      if (this.checkFightLoop(initialLifePoints, i)) {
        winner = this.handleWinnerAsFirstAttacker(firstPlayerToAttack, true);
        break;
      }
    }

    winner = !winner ? this.getWinner(firstPlayerToAttack) : winner;
    return winner;
  }
}

export default PVP;
