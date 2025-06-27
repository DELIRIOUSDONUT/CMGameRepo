System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCInteger, Component, ScoreUpdateEvent, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, ScoreCounter;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfScoreUpdateEvent(extras) {
    _reporterNs.report("ScoreUpdateEvent", "./ScoreUpdateEvent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      ScoreUpdateEvent = _unresolved_2.ScoreUpdateEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5f684IhVk1M5I0ZuxlQZfJx", "ScoreCounter", undefined);

      __checkObsolete__(['_decorator', 'CCFloat', 'CCInteger', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ScoreCounter", ScoreCounter = (_dec = ccclass('ScoreCounter'), _dec2 = property({
        type: CCInteger,
        tooltip: "How much the combo score increases per combo streak"
      }), _dec3 = property({
        type: CCInteger,
        tooltip: "How much the player is allowed to not match while maintaining the combo"
      }), _dec(_class = (_class2 = class ScoreCounter extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ScoreComboGrowth", _descriptor, this);

          _initializerDefineProperty(this, "ComboStreakTolerance", _descriptor2, this);

          // Current combo streak
          this.ComboStreak = 0;
          // Current score
          this.Score = 0;
          // Current combo misses
          this.ComboMisses = 0;
          // Current turn
          this.Turn = 0;
          // Current number of matches
          this.MatchCount = 0;
        }

        trackScore(score) {
          // Check if combo streak is broken
          if (score <= 0) {
            this.ComboMisses += 1;

            if (this.ComboMisses > this.ComboStreakTolerance) {
              this.ComboStreak = 0;
              this.ComboMisses = 0;
            }
          } else {
            // Player scored, so update score and combo
            this.ComboMisses = 0;
            this.ComboStreak += 1;
            this.Score += score + this.ScoreComboGrowth * (this.ComboStreak - 1);
            this.MatchCount += 1;
          }

          this.Turn += 1; // Emit signal to update UI for score and combo

          this.sendUpdate();
        }

        sendUpdate() {
          this.node.dispatchEvent(new (_crd && ScoreUpdateEvent === void 0 ? (_reportPossibleCrUseOfScoreUpdateEvent({
            error: Error()
          }), ScoreUpdateEvent) : ScoreUpdateEvent)(this.Score, this.ComboStreak, this.MatchCount, this.Turn));
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ScoreComboGrowth", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ComboStreakTolerance", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a125d109f0b97243b4f1c9797caf34a7a511d0cf.js.map