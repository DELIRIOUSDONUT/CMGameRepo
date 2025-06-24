import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardScript')
export class CardScript extends Component {
    FlippedUp : boolean;
    CardType : String;
    start() {
        this.FlippedUp = false;
        this.setCardType("testing");
    }

    update(deltaTime: number) {
        
    }

    setCardType(cardType: String){
        this.CardType = cardType;
        console.log("Card type set to: ", this.CardType);
    }
}

