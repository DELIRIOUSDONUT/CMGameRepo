import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreEvaluator')
export class ScoreEvaluator extends Component {
    
    scoreHashMap : Map<String, number>;
    defaultScore : number = 10;
    protected onLoad(): void {
        this.scoreHashMap = new Map<String, number>;
        let rankArray : Array<string> = new Array<string>;
        rankArray = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
        
        let suitArray : Array<string> = new Array<string>;
        suitArray = ["S", "H", "D", "C"];

        let index : number = 0;
        for(let i = 0; i < rankArray.length; i++){
            for(let j = 0; j < suitArray.length; j++){
                this.scoreHashMap.set(rankArray[i] + suitArray[j], this.defaultScore); // All types have the same score
                index++;
            }
        }
    }
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    getScore(id_a : String, id_b : String){
        if(id_a === id_b){
            let val = this.scoreHashMap.get(id_a);
            if(val === undefined){
                return 0;
            } 
            return val;
        }
        return 0; // If mismatch
    }
}

