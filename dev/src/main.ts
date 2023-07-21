import Phaser from "phaser";
import "./style.css";

class BattleScene extends Phaser.Scene {
  phase = "CREATE";
  partyMembers = [];
  enemieMembers = [];
  constructor() {
    super("battle");
  }
  create() {
    this.phase = "CMD";
  }
  update(time: number, delta: number): void {
    switch (this.phase) {
      case "CMD":
        const cmdText = this.add.text(100, 100, "START", { color: "#0f0" });
        cmdText.setInteractive({
          useHandCursor: true,
        });
        cmdText.on("pointerdown", () => {
          this.phase = "BATTLE";
        });
        break;
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
