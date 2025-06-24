import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardScript')
export class CardScript extends Component {
    FlippedUp : boolean;
    CardType : String;
    start() {
    }

    update(deltaTime: number) {
        
    }

    setCardType(cardType: String){
        this.CardType = cardType;
        console.log("Card type set to: ", this.CardType);
    }

    setFlipStatus(flippedUp : boolean){
        this.FlippedUp = flippedUp;
        console.log("Card flipped up: ", this.FlippedUp);
    }

    init(flippedUp : boolean, cardType : String){
        this.setFlipStatus(flippedUp);
        this.setCardType(cardType);
    }
}

