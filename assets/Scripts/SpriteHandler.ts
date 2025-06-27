import { _decorator, Component, Node, SpriteFrame, resources, Sprite, ImageAsset} from 'cc';
import { CardScript } from './CardScript';
const { ccclass, property } = _decorator;

@ccclass('SpriteHandler')
export class SpriteHandler extends Component {
    
    @property({type : SpriteFrame, tooltip: "Sprite for the back of the card"})
    BackSprite : SpriteFrame;

    getFileName(cardClass : string){
        let rank = cardClass[0];
        let suit = cardClass[1];

        if(rank == 'T'){
            rank = '10';
        }
        switch (suit){
            case 'H':
                suit = 'Hearts';
                break;
            case 'S':
                suit = 'Spades';
                break;
            case 'D':
                suit = 'Diamonds';
                break;
            case 'C':
                suit = 'Clubs';
                break;
            default:
                break;
        }

        let filename : string =  "card" + suit + rank;
        return filename;
    }

    setSprites(card : CardScript){
        let cardType = card.CardType;
        resources.load(this.getFileName(cardType as string) + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error('Error loading sprite:', err);
                return;
            }
            card.setSprite(spriteFrame, this.BackSprite);
        });

    }
}

