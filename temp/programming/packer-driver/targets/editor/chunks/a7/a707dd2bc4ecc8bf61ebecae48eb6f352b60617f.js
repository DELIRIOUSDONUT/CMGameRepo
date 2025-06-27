System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Event, ScreenSwitchEventRequest, _crd;

  _export("ScreenSwitchEventRequest", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Event = _cc.Event;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "60a50v3x9BCpbmCerU1TsYD", "ScreenSwitchRequestEvent", undefined);

      __checkObsolete__(['Event']);

      _export("ScreenSwitchEventRequest", ScreenSwitchEventRequest = class ScreenSwitchEventRequest extends Event {
        constructor(request) {
          super(request, true);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a707dd2bc4ecc8bf61ebecae48eb6f352b60617f.js.map