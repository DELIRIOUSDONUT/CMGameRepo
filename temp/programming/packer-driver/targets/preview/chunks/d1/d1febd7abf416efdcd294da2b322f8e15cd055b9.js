System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, CardSelectEvent, _dec, _class, _crd, ccclass, property, CardScript;

  function _reportPossibleCrUseOfCardSelectEvent(extras) {
    _reporterNs.report("CardSelectEvent", "./CardSelectEvent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      CardSelectEvent = _unresolved_2.CardSelectEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "72078SBVGJLKrHmFYvn9xxm", "CardScript", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Event']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CardScript", CardScript = (_dec = ccclass('CardScript'), _dec(_class = class CardScript extends Component {
        constructor() {
          super(...arguments);
          this.FlippedUp = void 0;
          this.CardType = void 0;
          this.CardID = void 0;
        }

        start() {}

        update(deltaTime) {}

        setCardType(cardType) {
          this.CardType = cardType;
          console.log("Card type set to: ", this.CardType);
        }

        setFlipStatus(flippedUp) {
          this.FlippedUp = flippedUp;
          console.log("ID: ", this.CardID, "Card flipped up: ", this.FlippedUp); // Add animation here based on flip status
        }

        init(flippedUp, cardType, cardID) {
          this.setFlipStatus(flippedUp);
          this.setCardType(cardType);
          this.CardID = cardID;
        } // For observer-publisher pattern, when card is selected, emit to card controller


        onCardSelected() {
          //console.log("Selected, attempt to emit event");
          //this.node.emit("card-selected", this);
          this.node.dispatchEvent(new (_crd && CardSelectEvent === void 0 ? (_reportPossibleCrUseOfCardSelectEvent({
            error: Error()
          }), CardSelectEvent) : CardSelectEvent)(this));
        }

        disable() {
          //this.node.active = false;
          this.node.getComponent("cc.Sprite").enabled = false;
          this.node.getComponent("cc.Button").enabled = false;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d1febd7abf416efdcd294da2b322f8e15cd055b9.js.map