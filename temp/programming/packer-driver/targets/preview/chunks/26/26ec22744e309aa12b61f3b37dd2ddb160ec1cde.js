System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, CardScript;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "72078SBVGJLKrHmFYvn9xxm", "CardScript", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CardScript", CardScript = (_dec = ccclass('CardScript'), _dec(_class = class CardScript extends Component {
        constructor() {
          super(...arguments);
          this.FlippedUp = void 0;
          this.CardType = void 0;
        }

        start() {
          this.FlippedUp = false;
          this.setCardType("testing");
        }

        update(deltaTime) {}

        setCardType(cardType) {
          this.CardType = cardType;
          console.log("Card type set to: ", this.CardType);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=26ec22744e309aa12b61f3b37dd2ddb160ec1cde.js.map