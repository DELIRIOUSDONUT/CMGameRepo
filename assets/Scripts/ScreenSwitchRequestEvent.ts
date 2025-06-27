import {Event} from "cc";

export class ScreenSwitchEventRequest extends Event {
    constructor(request : string){
        super(request, true);
    }
}
