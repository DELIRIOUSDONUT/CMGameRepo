import {Event} from "cc";
import { CardScript } from "./CardScript";

export class CardSelectEvent extends Event {
    constructor(card : CardScript){
        super("card-selected", true);
        this.card = card;
    }
    card : CardScript;
}
