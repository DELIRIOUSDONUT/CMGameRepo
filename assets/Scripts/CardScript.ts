import { _decorator, Component, Node , Event , Label, Sprite, SpriteFrame, AudioSource, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;
import { CardSelectEvent } from "./CardSelectEvent";

@ccclass('CardScript')
export class CardScript extends Component {
    @property({type: CCBoolean, tooltip: "Show card type for testing?"})
    ShowCardType : boolean;
    FlippedUp : boolean;
    CardType : String;
    CardID : number;
    CardSprite : SpriteFrame;
    BackSprite : SpriteFrame;
    SpriteFrame : Sprite;
    AudioSource : AudioSource;
    start() {
    }

    update(deltaTime: number) {
        
    }

    setCardType(cardType: String){
        this.CardType = cardType;
        console.log("Card type set to: ", this.CardType);

        // For testing
        if(this.ShowCardType){
            let label : Label = this.node.getComponentInChildren("cc.Label") as Label;
            label.string = this.CardType as string;
        }
        

    }

    setFlipStatus(flippedUp : boolean){
        this.FlippedUp = flippedUp;
        console.log("ID: ", this.CardID, "Card flipped up: ", this.FlippedUp);
        // Add animation here based on flip status
        if(this.CardSprite != null && this.BackSprite != null){
            if(this.FlippedUp){
                this.AudioSource.playOneShot(this.AudioSource.clip);
                this.SpriteFrame.spriteFrame = this.CardSprite;
            }
            else{
                this.SpriteFrame.spriteFrame = this.BackSprite;
            }
        }
    }

    init(flippedUp : boolean, cardType : String, cardID : number){
        console.log("---INIT---");
        this.CardID = cardID;
        this.setCardType(cardType);
        this.setFlipStatus(flippedUp);
        this.CardSprite = null;
        this.BackSprite = null;
        this.SpriteFrame = this.node.getComponent("cc.Sprite") as Sprite;
        this.AudioSource = this.node.getComponent("cc.AudioSource") as AudioSource;
        console.log("---END CARD INIT---");
    }

    setSprite(cardSprite : SpriteFrame, backSprite : SpriteFrame){
        this.CardSprite = cardSprite;
        this.BackSprite = backSprite;
        if(this.FlippedUp){
            this.SpriteFrame.spriteFrame = this.CardSprite;
        }
        else{
            this.SpriteFrame.spriteFrame = this.BackSprite;
        }
        console.log(cardSprite, backSprite);
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

