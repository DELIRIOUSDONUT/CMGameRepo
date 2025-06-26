System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, SpriteHandler;

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

      _cclegacy._RF.push({}, "0975czHUuhN153xlBVK0000", "SpriteHandler", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SpriteHandler", SpriteHandler = (_dec = ccclass('SpriteHandler'), _dec(_class = class SpriteHandler extends Component {
        start() {}

        update(deltaTime) {}

        getFileName(cardClass) {
          var rank = cardClass[0];
          var suit = cardClass[1];

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

          var filename = "card" + suit + rank;
          return filename;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=75f50742f94cd93512fd9cb4631ed6522e7fa6bb.js.map