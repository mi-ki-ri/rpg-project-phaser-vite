import Phaser from "phaser";
import "./style.css";

class BattleScene extends Phaser.Scene {
  constructor() {
    super("battle");
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
