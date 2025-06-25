System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, ScoreEvaluator;

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

      _cclegacy._RF.push({}, "b4d57lDSpxNlbxmL2IlHMSd", "ScoreEvaluator", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ScoreEvaluator", ScoreEvaluator = (_dec = ccclass('ScoreEvaluator'), _dec(_class = class ScoreEvaluator extends Component {
        constructor() {
          super(...arguments);
          this.scoreHashMap = void 0;
          this.defaultScore = 10;
        }

        onLoad() {
          this.scoreHashMap = new Map();
          var rankArray = new Array();
          rankArray = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
          var suitArray = new Array();
          suitArray = ["S", "H", "D", "C"];
          var index = 0;

          for (var i = 0; i < rankArray.length; i++) {
            for (var j = 0; j < suitArray.length; j++) {
              this.scoreHashMap.set(rankArray[i] + suitArray[j], this.defaultScore); // All types have the same score

              index++;
            }
          }
        }

        start() {}

        update(deltaTime) {}

        getScore(id_a, id_b) {
          if (id_a === id_b) {
            var val = this.scoreHashMap.get(id_a);

            if (val === undefined) {
              return 0;
            }

            return val;
          }

          return 0; // If mismatch
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9007ab4b72832a718a8bbabcded061842efed625.js.map