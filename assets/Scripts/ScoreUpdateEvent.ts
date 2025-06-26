import {Event} from "cc";

export class ScoreUpdateEvent extends Event {
    constructor(score : number, combo : number , matchCount : number, turn : number){
        super("score-update", true);
        this.score = score;
        this.combo = combo;
        this.turn = turn;
        this.matchCount = matchCount;
    }
    score : number;
    combo : number;
    turn : number;
    matchCount : number;
}
