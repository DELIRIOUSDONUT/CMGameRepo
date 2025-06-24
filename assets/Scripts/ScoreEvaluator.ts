import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreEvaluator')
export class ScoreEvaluator extends Component {
    
    scoreHashMap : Map<String, number>;
    
    start() {
        this.scoreHashMap = new Map<String, number>;
        // Find a better way to do this...
        this.scoreHashMap.set("testing", 0);
        this.scoreHashMap.set("scored", 100);
    }

    update(deltaTime: number) {
        
    }

    getScore(id_a : String, id_b : String){
        if(id_a === id_b){
            let val = this.scoreHashMap.get(id_a);
            if(val === undefined){
                return -1;
            } 
            return val;
        }
        return -1; // If mismatch
    }
}

