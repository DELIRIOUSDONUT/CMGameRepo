import { _decorator, Component, instantiate, Node, Prefab, Widget } from 'cc';
import { CCInteger } from 'cc'
import { CardScript } from './CardScript';
import { ScoreEvaluator } from './ScoreEvaluator';
import { CardSelectEvent } from './CardSelectEvent';
const { ccclass, property } = _decorator;

@ccclass('CardController')
export class CardController extends Component {
    @property({type: Prefab, tooltip: "Drag card prefab here"})
    CardPrefab : Prefab;

    @property({type: CCInteger, tooltip: "Number of cards"})
    NumCards : number;

    ScoreEval : ScoreEvaluator

    // Queue for tracking card selection events  --  for now use array, change to actual queue later
    // Stores ID of selected cards temporally, remove the first two on match/mismatch
    CardSelectedQueue : Array<CardScript>;

    // Number of cards currently selected
    NumSelectedCards : number;

    protected onLoad(): void {
        for (let i = 0; i < this.NumCards; i++){
            const childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            let cardScript : CardScript = 
                    childCard.getComponent("CardScript") as CardScript;
            
            cardScript.init(false, "Testing", i); // todo change this to randomly spreading different matches
            // For layout adjustments
            let widget : Widget = 
                    childCard.getComponent("cc.Widget") as Widget;
            widget.target = this.node;
        }

        // Get the evaluator script
        this.ScoreEval = this.node.getComponent("ScoreEvaluator") as ScoreEvaluator;

        this.CardSelectedQueue = new Array<CardScript>();
        this.NumSelectedCards = 0;
        // Setup listener for card selection events
        this.node.on("card-selected", (event : CardSelectEvent) => {
            let card : CardScript = event.card;
            // Stop event propagation
            event.propagationStopped = true;  
            console.log("Card selected: ", card.CardID, card.CardType);
            // Handle animation logic here

            // First add to queue
            this.CardSelectedQueue.push(card);
            this.NumSelectedCards++;
            // If no other cards selected, can flip face up
            if(this.NumSelectedCards == 1){
                // Flip face up
                card.setFlipStatus(true);
            } else if (this.NumSelectedCards > 1){
                // By this point, two cards are selected
                card.setFlipStatus(true);
                let score : number = this.ScoreEval.getScore(
                    this.CardSelectedQueue[0].CardType,
                    card.CardType
                );
                console.log("Score: ", score);
                
                if(score < 0){
                    // Mismatch
                    
                    // Do delay, then flip both cards face down
                    this.CardSelectedQueue[0].setFlipStatus(false);
                    card.setFlipStatus(false);
                    
                } else {
                    // Match

                    // Do delay, then disable both cards from rendering
                    this.CardSelectedQueue[0].disable();
                    card.disable();
                }
                // Eject the first two queue entries which are the two selected cards
                this.NumSelectedCards -= 2;
                this.CardSelectedQueue.shift();
                this.CardSelectedQueue.shift();

            } else {
                console.log("ERROR: Num selected cards: ", this.NumSelectedCards);
            }
        });
    }
    start() {
        //this.testGetChildren();
    }

    update(deltaTime: number) {
        // test score evaluator: should return 0, 100 and -1 sequentially
        //console.log(this.ScoreEval.getScore("testing", "testing"));
        //console.log(this.ScoreEval.getScore("scored", "scored"));
        //console.log(this.ScoreEval.getScore("mismatch", "another_mismatch"));
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

