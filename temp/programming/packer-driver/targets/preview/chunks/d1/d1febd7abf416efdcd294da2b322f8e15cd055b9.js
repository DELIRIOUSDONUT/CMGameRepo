System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, CCBoolean, CardSelectEvent, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, CardScript;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
      CCBoolean = _cc.CCBoolean;
    }, function (_unresolved_2) {
      CardSelectEvent = _unresolved_2.CardSelectEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "72078SBVGJLKrHmFYvn9xxm", "CardScript", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Event', 'Label', 'Sprite', 'SpriteFrame', 'AudioSource', 'CCBoolean']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CardScript", CardScript = (_dec = ccclass('CardScript'), _dec2 = property({
        type: CCBoolean,
        tooltip: "Show card type for testing?"
      }), _dec(_class = (_class2 = class CardScript extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "ShowCardType", _descriptor, this);

          this.FlippedUp = void 0;
          this.CardType = void 0;
          this.CardID = void 0;
          this.CardSprite = void 0;
          this.BackSprite = void 0;
          this.SpriteFrame = void 0;
          this.AudioSource = void 0;
        }

        start() {}

        update(deltaTime) {}

        setCardType(cardType) {
          this.CardType = cardType;
          console.log("Card type set to: ", this.CardType); // For testing

          if (this.ShowCardType) {
            var label = this.node.getComponentInChildren("cc.Label");
            label.string = this.CardType;
          }
        }

        setFlipStatus(flippedUp) {
          this.FlippedUp = flippedUp;
          console.log("ID: ", this.CardID, "Card flipped up: ", this.FlippedUp); // Add animation here based on flip status

          if (this.CardSprite != null && this.BackSprite != null) {
            if (this.FlippedUp) {
              this.AudioSource.playOneShot(this.AudioSource.clip);
              this.SpriteFrame.spriteFrame = this.CardSprite;
            } else {
              this.SpriteFrame.spriteFrame = this.BackSprite;
            }
          }
        }

        init(flippedUp, cardType, cardID) {
          console.log("---INIT---");
          this.CardID = cardID;
          this.setCardType(cardType);
          this.setFlipStatus(flippedUp);
          this.CardSprite = null;
          this.BackSprite = null;
          this.SpriteFrame = this.node.getComponent("cc.Sprite");
          this.AudioSource = this.node.getComponent("cc.AudioSource");
          console.log("---END CARD INIT---");
        }

        setSprite(cardSprite, backSprite) {
          this.CardSprite = cardSprite;
          this.BackSprite = backSprite;

          if (this.FlippedUp) {
            this.SpriteFrame.spriteFrame = this.CardSprite;
          } else {
            this.SpriteFrame.spriteFrame = this.BackSprite;
          }

          console.log(cardSprite, backSprite);
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ShowCardType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d1febd7abf416efdcd294da2b322f8e15cd055b9.js.map