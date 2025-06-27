import { _decorator, CCFloat, CCInteger, Component, Node } from 'cc';
import { ScoreUpdateEvent } from './ScoreUpdateEvent';
const { ccclass, property } = _decorator;

@ccclass('ScoreCounter')
export class ScoreCounter extends Component {
    @property({type : CCInteger, tooltip : "How much the combo score increases per combo streak"})
    ScoreComboGrowth : number = 5;

    @property({type : CCInteger, tooltip : "How much the player is allowed to not match while maintaining the combo"})
    ComboStreakTolerance : number = 1;

    // Current combo streak
    ComboStreak : number = 0;

    // Current score
    Score : number = 0;

    // Current combo misses
    ComboMisses : number = 0;

    // Current turn
    Turn : number = 0;

    // Current number of matches
    MatchCount : number = 0;

    trackScore(score : number){
        // Check if combo streak is broken
        if(score <= 0){
            this.ComboMisses += 1;
            if (this.ComboMisses > this.ComboStreakTolerance){
                this.ComboStreak = 0;
                this.ComboMisses = 0;
            }
        } else {
            // Player scored, so update score and combo
            this.ComboMisses = 0;
            this.ComboStreak += 1;
            this.Score += score + this.ScoreComboGrowth * (this.ComboStreak - 1);
            this.MatchCount += 1;
        }

        this.Turn += 1;
        // Emit signal to update UI for score and combo
        this.sendUpdate();
    }

    sendUpdate(){
        this.node.dispatchEvent(new ScoreUpdateEvent(this.Score, this.ComboStreak, this.MatchCount, this.Turn));
    }
}

