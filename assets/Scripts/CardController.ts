import { _decorator, Component, instantiate, Node, Prefab, WidgetComponent } from 'cc';
import { CardScript } from './CardScript';
const { ccclass, property } = _decorator;

@ccclass('CardController')
export class CardController extends Component {
    @property({type: Prefab, tooltip: "Drag card prefab here"})
    CardPrefab : Prefab;

    @property({type: Number, tooltip: "Number of cards"})
    NumCards : number;

    protected onLoad(): void {
        for (let i = 0; i < this.NumCards; i++){
            const childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            let cardScript : CardScript = 
                    childCard.getComponent("CardScript") as CardScript;
            
            cardScript.init(false, "Testing");
            // For layout adjustments
            let widget : WidgetComponent = childCard.getComponent("cc.Widget") as WidgetComponent;
            widget.target = this.node;
        }

        

    }
    start() {
        //this.testGetChildren();
    }

    update(deltaTime: number) {
        
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

