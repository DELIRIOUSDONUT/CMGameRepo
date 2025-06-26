import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteHandler')
export class SpriteHandler extends Component {
    
    start() {

    }

    update(deltaTime: number) {
        
    }

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
}

