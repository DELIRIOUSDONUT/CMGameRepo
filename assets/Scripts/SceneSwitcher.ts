import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { ScreenSwitchEventRequest } from './ScreenSwitchRequestEvent';

@ccclass('SceneSwitcher')
export class SceneSwitcher extends Component {
    @property({type : Node, tooltip: "Victory screen node"})
    VictoryScreenNode : Node;

    start() {
        this.VictoryScreenNode.active = false;
        this.node.on("victory", (event : ScreenSwitchEventRequest) => {
            this.VictoryScreenNode.active = true;
        })
    }

    update(deltaTime: number) {
        
    }


}

