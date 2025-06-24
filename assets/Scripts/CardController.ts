import { _decorator, Component, instantiate, Node, Prefab, WidgetComponent } from 'cc';
import { CardScript } from './CardScript';
import { ScoreEvaluator } from './ScoreEvaluator';
const { ccclass, property } = _decorator;

@ccclass('CardController')
export class CardController extends Component {
    @property({type: Prefab, tooltip: "Drag card prefab here"})
    CardPrefab : Prefab;

    @property({type: Number, tooltip: "Number of cards"})
    NumCards : number;

    ScoreEval : ScoreEvaluator
    protected onLoad(): void {
        for (let i = 0; i < this.NumCards; i++){
            const childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            let cardScript : CardScript = 
                    childCard.getComponent("CardScript") as CardScript;
            
            cardScript.init(false, "Testing");
            // For layout adjustments
            let widget : WidgetComponent = 
                    childCard.getComponent("cc.Widget") as WidgetComponent;
            widget.target = this.node;
        }

        // Get the evaluator script
        this.ScoreEval = this.node.getComponent("ScoreEvaluator") as ScoreEvaluator;

        

    }
    start() {
        //this.testGetChildren();
    }

    update(deltaTime: number) {
        // test score evaluator: should return 0, 100 and -1 sequentially
        console.log(this.ScoreEval.getScore("testing", "testing"));
        console.log(this.ScoreEval.getScore("scored", "scored"));
        console.log(this.ScoreEval.getScore("mismatch", "another_mismatch"));
    }

    testGetChildren(){
        this.node.children.forEach(childNode=> {
            console.log(childNode.name);
            let cardScript : CardScript = 
                        childNode.getComponent("CardScript") as CardScript;
            if(cardScript){
                console.log(cardScript.CardType, cardScript.FlippedUp);
            }
            
        });
    }
}

