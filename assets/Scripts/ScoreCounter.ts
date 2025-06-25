import { _decorator, CCFloat, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreCounter')
export class ScoreCounter extends Component {
    @property({type : CCFloat, tooltip : "How much the combo score increases per combo streak"})
    ScoreComboGrowth : number = 0.1;

    @property({type : CCInteger, tooltip : "How much the player is allowed to not match while maintaining the combo"})
    ComboStreakTolerance : number = 1;

    // Current combo streak
    ComboStreak : number = 0;

    // Current score
    Score : number = 0;

    // Current combo misses
    ComboMisses : number = 0;
    start() {

    }

    update(deltaTime: number) {
        
    }

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
            this.Score += score;
        }
    }
}

