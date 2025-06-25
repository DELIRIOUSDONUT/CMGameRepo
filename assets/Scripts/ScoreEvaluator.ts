import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreEvaluator')
export class ScoreEvaluator extends Component {
    
    scoreHashMap : Map<String, number>;
    
    protected onLoad(): void {
        this.scoreHashMap = new Map<String, number>;
        // Find a better way to do this...
        this.scoreHashMap.set("Testing", 10);
        this.scoreHashMap.set("Scored", 100);
        this.scoreHashMap.set("a", 20);
        this.scoreHashMap.set("b", 30);
        this.scoreHashMap.set("c", 40);
    }
    start() {
        
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

