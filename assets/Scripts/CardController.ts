import { _decorator, Component, instantiate, Node, Prefab, Widget } from 'cc';
import { CCInteger } from 'cc'
import { CardScript } from './CardScript';
import { ScoreEvaluator } from './ScoreEvaluator';
import { CardSelectEvent } from './CardSelectEvent';
import { ScoreCounter } from './ScoreCounter';
const { ccclass, property } = _decorator;

@ccclass('CardController')
export class CardController extends Component {
    @property({type: Prefab, tooltip: "Drag card prefab here"})
    CardPrefab : Prefab;

    @property({type: CCInteger, tooltip: "Number of cards"})
    NumCards : number;

    ScoreEval : ScoreEvaluator;

    // Queue for tracking card selection events  --  for now use array, change to actual queue later
    // Stores ID of selected cards temporally, remove the first two on match/mismatch
    CardSelectedQueue : Array<CardScript>;

    // Number of cards currently selected
    NumSelectedCards : number;

    // Assuming that number of cards is even, there must be NumCards/2 unique pairs
    // However, can have repeated pairs if run out of card types
    // For now, use 5 card types 

    // Object to keep track of player score
    ScoreCounter : ScoreCounter;

    SaveState = {
        score: 0,
        combo: 0,
        cards : [] as string[],
        faceUpIndex: -1,
        removedCards : [] as number[]
    };

    protected onLoad(): void {
        
    }
    start() {
        // Get the evaluator script
        this.ScoreEval = this.node.getComponent("ScoreEvaluator") as ScoreEvaluator;
        // Get score tracker
        this.ScoreCounter = this.node.getComponent("ScoreCounter") as ScoreCounter;
        // If save state exists and at least one pair is left
        if((localStorage.getItem("saveState")) ){
            console.log("Fetched save data");
            this.SaveState = JSON.parse(localStorage.getItem("saveState") as string);
            // parse from here
            this.NumCards = this.SaveState.cards.length;
            this.ScoreCounter.Score = this.SaveState.score;
            this.ScoreCounter.ComboStreak = this.SaveState.combo;
            for(let i = 0; i < this.NumCards; i++){
                const childCard = instantiate(this.CardPrefab);
                this.node.addChild(childCard);
                let cardScript : CardScript = 
                    this.node.children[i].getComponent("CardScript") as CardScript;
                cardScript.init(false, this.SaveState.cards[i], i);
                if(this.SaveState.faceUpIndex == i){
                    cardScript.setFlipStatus(true);
                }
                if(this.SaveState.removedCards[i] == 1){
                    cardScript.disable();
                }
                
            }
            // Setup listener for card selection events
            this.setupCardMatchListener();
            return;
        }

        // First make sure that numcards is an even number (cant make pairs with odd num)
        if(this.NumCards % 2 != 0){
            this.NumCards -= 1;
        }
        

        // Get a random subset of card type pairs
        let shuffledTypes : Array<String> = this.getCardTypes();

        // Instantiate all cards
        for (let i = 0; i < this.NumCards; i++){
            const childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            let cardScript : CardScript = 
                    childCard.getComponent("CardScript") as CardScript;
            
            cardScript.init(false, shuffledTypes[i], i); 
            // For layout adjustments
            let widget : Widget = 
                    childCard.getComponent("cc.Widget") as Widget;
            widget.target = this.node;

            // Save to save state
            this.SaveState.cards.push(shuffledTypes[i] as string);
            this.SaveState.removedCards.push(0);
        }

        

        // Setup listener for card selection events
        this.setupCardMatchListener();

        
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

    setupCardMatchListener(){
        this.CardSelectedQueue = new Array<CardScript>();
        this.NumSelectedCards = 0;
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
                this.SaveState.faceUpIndex = card.CardID; // this works because the card id IS the index
            } else if (this.NumSelectedCards > 1){
                // By this point, two cards are selected
                this.SaveState.faceUpIndex = -1;
                card.setFlipStatus(true);
                let score : number = this.ScoreEval.getScore(
                    this.CardSelectedQueue[0].CardType,
                    card.CardType
                );
                console.log("Score: ", score);
                
                // Pass score to score counter
                this.ScoreCounter.trackScore(score);
                // For save state
                this.SaveState.score = this.ScoreCounter.Score;
                this.SaveState.combo = this.ScoreCounter.ComboStreak;
                // Save combo to save state
                if(score <= 0){
                    // Mismatch
                    this.SaveState.combo = 0;
                    // Do delay, then flip both cards face down
                    this.CardSelectedQueue[0].setFlipStatus(false);
                    card.setFlipStatus(false);
                    
                } else {
                    // Match
    
                    // Do delay, then disable both cards from rendering
                    this.CardSelectedQueue[0].disable();
                    card.disable();

                    // Add disabled cards to save state
                    this.SaveState.removedCards[this.CardSelectedQueue[0].CardID] = 1;
                    this.SaveState.removedCards[card.CardID] = 1;
                }
                // Eject the first two queue entries which are the two selected cards
                this.NumSelectedCards -= 2;
                this.CardSelectedQueue.shift();
                this.CardSelectedQueue.shift();
    
            } else {
                console.log("ERROR: Num selected cards: ", this.NumSelectedCards);
            }
            console.log(this.SaveState);
            
            // if all cards are removed, no need to save state as game is over
            if(this.SaveState.removedCards.every((val) => val == 1)){
                localStorage.removeItem("saveState");
            } else {
                localStorage.setItem("saveState", JSON.stringify(this.SaveState));
            }
        });
    }

    getCardTypes() : Array<String>{
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
        return shuffledTypes;
    }
}

// Using the Fisher-Yates shuffle to shuffle an array
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
