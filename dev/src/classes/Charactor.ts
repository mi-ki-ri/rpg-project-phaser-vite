import Skill from "./Skill";
class Charactor {
  constructor(
    public name: string,
    public hp: number,
    public mp: number,
    public at: number,
    public df: number,
    public sp: number,
    public skills: Skill[],
    public isDead: boolean = false
  ) {}

  attack(target: Charactor): void {
    target.damage(this.at - target.df);
  }
  damage(damage: number): void {
    this.hp -= damage;
    console.log(`${this.name}は${damage}のダメージを受けた`);
    if (this.hp <= 0) {
      console.log(`${this.name}は死んでしまった`);
      this.isDead = true;
    }
  }
}

export default Charactor;
