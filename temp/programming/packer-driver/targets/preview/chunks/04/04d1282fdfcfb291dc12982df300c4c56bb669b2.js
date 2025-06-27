System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, view, _dec, _class, _crd, ccclass, property, BGScaler;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "53a9djbdt9MQ5bWxEJvRQsJ", "BGScaler", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Sprite', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BGScaler", BGScaler = (_dec = ccclass('BGScaler'), _dec(_class = class BGScaler extends Component {
        onLoad() {
          var sprite = this.node.getComponent("cc.Sprite");
          var UITransform = this.node.getComponent("cc.UITransform");
          var screenSize = view.getVisibleSize();
          var spriteSize = sprite.spriteFrame.originalSize;
          console.log("screenSize width is ", screenSize.width);
          console.log("screenSize height is ", screenSize.height);
          console.log("spriteSize width is ", spriteSize.width);
          console.log("spriteSize height is ", spriteSize.height);
          var scale = Math.max(spriteSize.width / screenSize.width, spriteSize.height / screenSize.height);
          var maxSqSize = Math.max(screenSize.width, screenSize.height);
          UITransform.setContentSize(maxSqSize, maxSqSize);
          this.node.setScale(scale, scale, 1);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=04d1282fdfcfb291dc12982df300c4c56bb669b2.js.map