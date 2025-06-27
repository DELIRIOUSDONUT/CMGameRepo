System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, CCInteger, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, ScoreEvaluator;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      CCInteger = _cc.CCInteger;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b4d57lDSpxNlbxmL2IlHMSd", "ScoreEvaluator", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'CCInteger']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ScoreEvaluator", ScoreEvaluator = (_dec = ccclass('ScoreEvaluator'), _dec2 = property({
        type: CCInteger,
        tooltip: "Default score for each card type"
      }), _dec(_class = (_class2 = class ScoreEvaluator extends Component {
        constructor() {
          super(...arguments);
          this.scoreHashMap = void 0;

          _initializerDefineProperty(this, "defaultScore", _descriptor, this);
        }

        onLoad() {
          this.scoreHashMap = new Map(); // These are based on the assumption that we're using playing cards -- adjust later for different types

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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultScore", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9007ab4b72832a718a8bbabcded061842efed625.js.map