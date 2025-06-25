import { _decorator, Component, Node , Label, RichText } from 'cc';
const { ccclass, property } = _decorator;
import { ScoreUpdateEvent } from './ScoreUpdateEvent';

@ccclass('ScoreUpdater')
export class ScoreUpdater extends Component {

    @property({type: Node, tooltip: "Drag node with score text here"})
    ScoreTextNode : Node;

    @property({type: Node, tooltip: "Drag node with combo text here"})
    ComboTextNode : Node;

    ScoreText : RichText;
    ComboText : RichText;
    start() {
        this.node.on("score-update", this.updateScore, this);
        this.ScoreText = this.ScoreTextNode.getComponent("cc.RichText") as RichText;
        this.ComboText = this.ComboTextNode.getComponent("cc.RichText") as RichText;
        
        this.ScoreText.string = "<color=#ffffff>Score = 0</color>";
        this.ComboText.string = "<color=#ffffff>Combo = 0</color>";
    }

    updateScore(event : ScoreUpdateEvent){
        console.log("Score: " + event.score);
        console.log("Combo: " + event.combo);
        this.ScoreText.string = "<color=#ffffff>Score = " + event.score + "</color>";
        this.ComboText.string = "<color=#ffffff>Combo = " + event.combo + "</color>";
    }

    update(deltaTime: number) {
        
    }
}

