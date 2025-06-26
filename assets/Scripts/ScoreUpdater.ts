import { _decorator, Component, Node , Label, RichText } from 'cc';
const { ccclass, property } = _decorator;
import { ScoreUpdateEvent } from './ScoreUpdateEvent';

@ccclass('ScoreUpdater')
export class ScoreUpdater extends Component {

    @property({type: Node, tooltip: "Drag node with score text here"})
    ScoreTextNode : Node;

    @property({type: Node, tooltip: "Drag node with combo text here"})
    ComboTextNode : Node;

    @property({type: Node, tooltip: "Drag node with match text here"})
    MatchTextNode : Node;

    @property({type: Node, tooltip: "Drag node with turn text here"})
    TurnTextNode : Node;

    ScoreText : RichText;
    ComboText : RichText;
    MatchText : RichText;
    TurnText : RichText;
    start() {
        this.node.on("score-update", this.updateScore, this);
        this.ScoreText = this.ScoreTextNode.getComponent("cc.RichText") as RichText;
        this.ComboText = this.ComboTextNode.getComponent("cc.RichText") as RichText;
        this.MatchText = this.MatchTextNode.getComponent("cc.RichText") as RichText;
        this.TurnText = this.TurnTextNode.getComponent("cc.RichText") as RichText;
        this.MatchText.string = "Match = 0";
        this.TurnText.string = "Turn = 0";
        this.ScoreText.string = "Score = 0";
        this.ComboText.string = "Combo = 0";
    }

    updateScore(event : ScoreUpdateEvent){
        console.log("Score: " + event.score);
        console.log("Combo: " + event.combo);
        console.log("Match: " + event.matchCount);
        console.log("Turn: " + event.turn);
        this.ScoreText.string = "Score = " + event.score;
        this.ComboText.string = "Combo = " + event.combo;
        this.MatchText.string = "Match = " + event.matchCount;
        this.TurnText.string = "Turn = " + event.turn;
    }

    update(deltaTime: number) {
        
    }
}

