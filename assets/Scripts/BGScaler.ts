import { _decorator, Component, Node, UITransform , Sprite , view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BGScaler')
export class BGScaler extends Component {

    protected onLoad(): void {
        const sprite : Sprite = this.node.getComponent("cc.Sprite") as Sprite;
        const UITransform : UITransform = this.node.getComponent("cc.UITransform") as UITransform;
        const screenSize = view.getVisibleSize();
        const spriteSize = sprite.spriteFrame.originalSize;

        console.log("screenSize width is ", screenSize.width);
        console.log("screenSize height is ", screenSize.height);
        console.log("spriteSize width is ", spriteSize.width);
        console.log("spriteSize height is ", spriteSize.height);

        const scale = Math.max(
            spriteSize.width / screenSize.width,
            spriteSize.height / screenSize.height
        );

        const maxSqSize = Math.max(screenSize.width, screenSize.height);
        UITransform.setContentSize(maxSqSize, maxSqSize);
        this.node.setScale(scale, scale, 1);

    }
}

