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
        }

        start() {
          this.scoreHashMap = new Map(); // Find a better way to do this...

          this.scoreHashMap.set("testing", 0);
          this.scoreHashMap.set("scored", 100);
        }

        update(deltaTime) {}

        getScore(id_a, id_b) {
          if (id_a === id_b) {
            var val = this.scoreHashMap.get(id_a);

            if (val === undefined) {
              return -1;
            }

            return val;
          }

          return -1; // If mismatch
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9007ab4b72832a718a8bbabcded061842efed625.js.map