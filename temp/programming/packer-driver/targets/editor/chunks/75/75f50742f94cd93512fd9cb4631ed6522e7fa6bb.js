System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, SpriteFrame, resources, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, SpriteHandler;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCardScript(extras) {
    _reporterNs.report("CardScript", "./CardScript", _context.meta, extras);
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
      SpriteFrame = _cc.SpriteFrame;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0975czHUuhN153xlBVK0000", "SpriteHandler", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame', 'resources', 'Sprite', 'ImageAsset']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SpriteHandler", SpriteHandler = (_dec = ccclass('SpriteHandler'), _dec2 = property({
        type: SpriteFrame,
        tooltip: "Sprite for the back of the card"
      }), _dec(_class = (_class2 = class SpriteHandler extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "BackSprite", _descriptor, this);
        }

        start() {}

        update(deltaTime) {}

        getFileName(cardClass) {
          let rank = cardClass[0];
          let suit = cardClass[1];

          if (rank == 'T') {
            rank = '10';
          }

          switch (suit) {
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

          let filename = "card" + suit + rank;
          return filename;
        }

        setSprites(card) {
          let cardType = card.CardType;
          resources.load(this.getFileName(cardType) + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
              console.error('Error loading sprite:', err);
              return;
            }

            card.setSprite(spriteFrame, this.BackSprite);
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "BackSprite", [_dec2], {
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
//# sourceMappingURL=75f50742f94cd93512fd9cb4631ed6522e7fa6bb.js.map