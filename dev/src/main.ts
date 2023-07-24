import Phaser from "phaser";
import "./style.css";
import Charactor from "./classes/Charactor.ts";
import Skill from "./classes/Skill.ts";

class BattleScene extends Phaser.Scene {
  phase = "CREATE";
  isWaiting = false;
  partyMembers: Charactor[] = [];
  enemieMembers: Charactor[] = [];
  charactors: Charactor[] = [];

  constructor() {
    super("battle");
  }
  create() {
    this.partyMembers = [
      new Charactor("勇者", 100, 10, 10, 10, 10, [
        new Skill("攻撃", 0, (self: Charactor, target: Charactor) => {
          target.damage(self.at - target.df / 2);
        }),
        new Skill("ファイア", 10, (self: Charactor, target: Charactor) => {
          self.mp -= 10;
          target.damage(10);
        }),
      ]),
      new Charactor("戦士", 100, 10, 10, 10, 10, [
        new Skill("攻撃", 0, (self: Charactor, target: Charactor) => {
          target.damage(self.at - target.df / 2);
        }),
      ]),
      new Charactor("魔法使い", 100, 10, 10, 10, 10, [
        new Skill("攻撃", 0, (self: Charactor, target: Charactor) => {
          target.damage(self.at - target.df / 2);
        }),
        new Skill("メギド", 10, (self: Charactor, target: Charactor) => {
          self.mp -= 10;
          target.damage(10);
        }),
      ]),
    ];

    this.enemieMembers = [
      new Charactor("スライム", 100, 10, 10, 10, 10, [
        new Skill("攻撃", 0, (self: Charactor, target: Charactor) => {
          target.damage(self.at - target.df / 2);
        }),
      ]),
      new Charactor("ドラゴン", 100, 10, 10, 10, 10, [
        new Skill("攻撃", 0, (self: Charactor, target: Charactor) => {
          target.damage(self.at - target.df / 2);
        }),
      ]),
      new Charactor("魔王", 100, 10, 10, 10, 10, [
        new Skill("攻撃", 0, (self: Charactor, target: Charactor) => {
          target.damage(self.at - target.df / 2);
        }),
        new Skill("メギド", 10, (self: Charactor, target: Charactor) => {
          self.mp -= 10;
          target.damage(10);
        }),
      ]),
    ];

    this.phase = "WT_START";
  }
  update(time: number, delta: number): void {
    if (this.isWaiting) {
      return;
    }
    switch (this.phase) {
      case "WT_START":
        this.charactors = this.partyMembers.concat(this.enemieMembers);
        this.charactors.sort((a, b) => {
          return b.sp - a.sp;
        });
        this.phase = "WT_ROUND";
        break;
      case "WT_ROUND":
        const charactor = this.charactors.shift();

        if (charactor && charactor.isDead) break;

        if (charactor && !charactor.isDead) {
          charactor.skills
            .sort(() => {
              return Math.random() - 0.5;
            })
            .find((skill) => {
              if (skill.mp <= charactor.mp) {
                const target = this.charactors.find((target) => {
                  return target !== charactor && !target.isDead;
                });
                if (target && !target.isDead) {
                  skill.effect(charactor, target);
                }
                const msgTxt = this.add.text(
                  0,
                  0,
                  `${charactor.name}の${skill.name}`
                );
                msgTxt.x = 400 - msgTxt.width / 2;
                msgTxt.y = 300 - msgTxt.height / 2;
                msgTxt.setInteractive();
                msgTxt.on("pointerdown", () => {
                  if (this.charactors.length === 0) {
                    this.phase = "WT_START";
                  } else {
                    this.phase = "WT_ROUND";
                  }
                  this.isWaiting = false;
                  msgTxt.destroy();
                });
                this.isWaiting = true;
                return true;
              }
            });
        }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  scene: BattleScene,
};

const game = new Phaser.Game(config);
