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

    // Assuming that number of cards is even, there must be NumCards/2 unique pairs
    // However, can have repeated pairs if run out of card types
    // For now, use 5 card types 

    protected onLoad(): void {
        
    }
    start() {
        //this.testGetChildren();
        // Get the evaluator script
        this.ScoreEval = this.node.getComponent("ScoreEvaluator") as ScoreEvaluator;

        // From the score evaluator, get the list of scoring card types
        let scoringTypes : Array<String> = Array.from(this.ScoreEval.scoreHashMap.keys());
        scoringTypes = shuffleArray(scoringTypes);
        console.log(scoringTypes);
        let numTypes : number = this.NumCards / 2;
        let shuffledTypes : Array<String> = new Array<String>();
        // Get the first numTypes shuffled types from the evaluator, and only use those for this game
        console.log(shuffledTypes);
        for(let i = 0; i < numTypes; i++){
            // Push twice since we need pairs
            shuffledTypes.push(scoringTypes[i]);
            shuffledTypes.push(scoringTypes[i]);
            console.log(shuffledTypes);
        }
        //console.log(shuffledTypes);
        shuffledTypes = shuffleArray(shuffledTypes);
        //console.log(shuffledTypes);
        

        for (let i = 0; i < this.NumCards; i++){
            const childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            let cardScript : CardScript = 
                    childCard.getComponent("CardScript") as CardScript;
            
            cardScript.init(false, shuffledTypes[i], i); // todo change this to randomly spreading different matches
            // For layout adjustments
            let widget : Widget = 
                    childCard.getComponent("cc.Widget") as Widget;
            widget.target = this.node;
        }

        

        this.CardSelectedQueue = new Array<CardScript>();
        this.NumSelectedCards = 0;
        // Setup listener for card selection events
        this.node.on("card-selected", (event : CardSelectEvent) => {
            let card : CardScript = event.card;
            // Stop event propagation
            event.propagationStopped = true;  
            console.log("SELECTED CARD ID: ", card.CardID, " CARD TYPE: ",card.CardType);
            // Handle animation logic here

            // Check if this card is already face up. If it is then early return
            if(card.FlippedUp){
                return;
            }
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

// Using the Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
