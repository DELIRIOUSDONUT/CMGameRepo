import { _decorator, Component, instantiate, Layout, Node, Prefab, UITransform, Widget, Button} from 'cc';
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

    // Object to keep track of player score
    ScoreCounter : ScoreCounter;

    // For keeping track of game states across restarts
    SaveState = {
        score: 0,
        combo: 0,
        cards : [] as string[],
        faceUpIndex: -1,
        removedCards : [] as number[],
        columnReq: 0,
        numCards : 0
    };

    // Number of columns required by Layout
    ColumnReq : number;

    // Dimensions of cards based on number of cards and requird columns
    childCardHeight : number;
    childCardWidth : number;
    
    start() {
        // Get requirements for card sizes and columns
        this.getCardSize();
        // Get the evaluator script
        this.ScoreEval = this.node.getComponent("ScoreEvaluator") as ScoreEvaluator;
        // Get score tracker
        this.ScoreCounter = this.node.getComponent("ScoreCounter") as ScoreCounter;
        // If save state exists and at least one pair is left
        if(this.loadIfAvailable()){
            // Setup listener for card selection events
            this.setupCardMatchListener();
            // No need to set up game
            return;
        }
        
        // By this point, failed to load save data, so set up game
        this.SaveState = {
            score: 0,
            combo: 0,
            cards : [] as string[],
            faceUpIndex: -1,
            removedCards : [] as number[],
            columnReq: 0,
            numCards : 0
        };

        // First make sure that numcards is an even number (cant make pairs with odd num)
        if(this.NumCards % 2 != 0){
            this.NumCards -= 1;
        }

        this.SaveState.columnReq = this.ColumnReq;
        this.SaveState.numCards = this.NumCards;
        
        // Get a random subset of card type pairs
        let shuffledTypes : Array<String> = this.getCardTypes();

        // Instantiate all cards
        for (let i = 0; i < this.NumCards; i++){
            const childCard = instantiate(this.CardPrefab);
            let childTransform : UITransform = 
                childCard.getComponent("cc.UITransform") as UITransform;
            childTransform.width = this.childCardWidth;
            childTransform.height = this.childCardHeight;
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
                // While face up, cannot interact with it
                let button : Button = card.getComponent("cc.Button") as Button;
                button.interactable = false;
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

                    // Enable both buttons
                    let button1 : Button = this.CardSelectedQueue[0].getComponent("cc.Button") as Button;
                    button1.interactable = true;
                    let button2 : Button = card.getComponent("cc.Button") as Button;
                    button2.interactable = true;
                    
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

    getCardSize(){
        // For NumCards, adjust the size of the cell such that they fit perfectly in the container
        // Need to reference the column constraint 
        let parentLayout : Layout = this.node.getComponent("cc.Layout") as Layout;
        let parentTransform : UITransform = this.node.getComponent("cc.UITransform") as UITransform;
        let parentWidth : number = parentTransform.contentSize.width;
        let parentHeight : number = parentTransform.contentSize.height;
        if(parentLayout.constraint == Layout.Constraint.FIXED_COL){
            let numCols : number = parentLayout.constraintNum;
            this.ColumnReq = numCols;
            if(this.NumCards >= numCols){
                // Have to be the full size
                // Adjust width to fit
                console.log("Parent width ", parentWidth, ", parent height ", parentHeight);
                this.childCardWidth = (parentWidth - ((numCols - 1) * parentLayout.spacingX)) / numCols;
                // Adjust height to fit
                let numRows : number = Math.ceil(this.NumCards / numCols);
                console.log("Num rows is ", numRows);
                this.childCardHeight = (parentHeight - ((numRows - 1) * parentLayout.spacingY)) / numRows;
            } else {
                // Grow the children
                return;
            }
        }

    }

    loadIfAvailable(){
        if((localStorage.getItem("saveState")) ){
            console.log("Fetched save data");
            this.SaveState = JSON.parse(localStorage.getItem("saveState") as string);
            console.log("savedata: column req:" + this.SaveState.columnReq);
            console.log("savedata numcards: " + this.SaveState.numCards);
            console.log("savedata score: " + this.SaveState.score);
            console.log("savedata combo: " + this.SaveState.combo);
            if(this.SaveState.columnReq != this.ColumnReq){
                console.log("Column req not met", this.SaveState.columnReq, this.ColumnReq);
                return false;
            } else if(this.SaveState.cards.length != this.NumCards){
                console.log("Num cards not met", this.SaveState.cards.length, this.NumCards);
                return false;
            } else {
                console.log("Parse success");
                console.log(this.SaveState.cards);
                // parse from here
                this.NumCards = this.SaveState.cards.length;
                this.ScoreCounter.Score = this.SaveState.score;
                this.ScoreCounter.ComboStreak = this.SaveState.combo;
                this.ScoreCounter.sendUpdate();
                for(let i = 0; i < this.SaveState.numCards; i++){
                    const childCard = instantiate(this.CardPrefab);
                    let childTransform : UITransform = 
                        childCard.getComponent("cc.UITransform") as UITransform;
                    childTransform.width = this.childCardWidth;
                    childTransform.height = this.childCardHeight;
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
                return true;
            }
        } else {
            return false;
        }
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
