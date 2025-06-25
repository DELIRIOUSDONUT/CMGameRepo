import {Event} from "cc";

export class ScoreUpdateEvent extends Event {
    constructor(score : number, combo : number){
        super("score-update", true);
        this.score = score;
        this.combo = combo;
    }
    score : number;
    combo : number;
}
