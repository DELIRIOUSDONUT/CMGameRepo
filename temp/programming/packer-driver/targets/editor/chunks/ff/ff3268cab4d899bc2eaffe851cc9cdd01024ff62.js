System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Event, ScoreUpdateEvent, _crd;

  _export("ScoreUpdateEvent", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Event = _cc.Event;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3a125iXywdMooyUU3Vy/WaO", "ScoreUpdateEvent", undefined);

      __checkObsolete__(['Event']);

      _export("ScoreUpdateEvent", ScoreUpdateEvent = class ScoreUpdateEvent extends Event {
        constructor(score, combo, matchCount, turn) {
          super("score-update", true);
          this.score = void 0;
          this.combo = void 0;
          this.turn = void 0;
          this.matchCount = void 0;
          this.score = score;
          this.combo = combo;
          this.turn = turn;
          this.matchCount = matchCount;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ff3268cab4d899bc2eaffe851cc9cdd01024ff62.js.map