import { _decorator, Component, Node , Event , Label} from 'cc';
const { ccclass, property } = _decorator;
import { CardSelectEvent } from "./CardSelectEvent";

@ccclass('CardScript')
export class CardScript extends Component {
    FlippedUp : boolean;
    CardType : String;
    CardID : number;

    start() {
    }

    update(deltaTime: number) {
        
    }

    setCardType(cardType: String){
        this.CardType = cardType;
        console.log("Card type set to: ", this.CardType);

        // For testing
        let label : Label = this.node.getComponentInChildren("cc.Label") as Label;
        label.string = this.CardType as string;

    }

    setFlipStatus(flippedUp : boolean){
        this.FlippedUp = flippedUp;
        console.log("ID: ", this.CardID, "Card flipped up: ", this.FlippedUp);
        // Add animation here based on flip status
    }

    init(flippedUp : boolean, cardType : String, cardID : number){
        console.log("---INIT---");
        this.CardID = cardID;
        this.setCardType(cardType);
        this.setFlipStatus(flippedUp);
        console.log("---END CARD INIT---");
    }

    // For observer-publisher pattern, when card is selected, emit to card controller
    onCardSelected(){
        //console.log("Selected, attempt to emit event");
        //this.node.emit("card-selected", this);
        this.node.dispatchEvent(new CardSelectEvent(this));
    }

    disable(){
        //this.node.active = false;
        this.node.getComponent("cc.Sprite").enabled = false;
        this.node.getComponent("cc.Button").enabled = false;
    }

}

