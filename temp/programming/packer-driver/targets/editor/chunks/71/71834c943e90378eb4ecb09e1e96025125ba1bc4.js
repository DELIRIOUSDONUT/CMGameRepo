System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Event, CardSelectEvent, _crd;

  function _reportPossibleCrUseOfCardScript(extras) {
    _reporterNs.report("CardScript", "./CardScript", _context.meta, extras);
  }

  _export("CardSelectEvent", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Event = _cc.Event;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b17bfOdSiFAt7+lXwqtf6de", "CardSelectEvent", undefined);

      __checkObsolete__(['Event']);

      _export("CardSelectEvent", CardSelectEvent = class CardSelectEvent extends Event {
        constructor(card) {
          super("card-selected", true);
          this.card = void 0;
          this.card = card;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=71834c943e90378eb4ecb09e1e96025125ba1bc4.js.map