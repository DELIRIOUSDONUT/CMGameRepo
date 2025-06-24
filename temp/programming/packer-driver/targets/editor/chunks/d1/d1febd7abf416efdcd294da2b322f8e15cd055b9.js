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
        constructor(...args) {
          super(...args);
          this.FlippedUp = void 0;
          this.CardType = void 0;
        }

        start() {}

        update(deltaTime) {}

        setCardType(cardType) {
          this.CardType = cardType;
          console.log("Card type set to: ", this.CardType);
        }

        setFlipStatus(flippedUp) {
          this.FlippedUp = flippedUp;
          console.log("Card flipped up: ", this.FlippedUp);
        }

        init(flippedUp, cardType) {
          this.setFlipStatus(flippedUp);
          this.setCardType(cardType);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d1febd7abf416efdcd294da2b322f8e15cd055b9.js.map