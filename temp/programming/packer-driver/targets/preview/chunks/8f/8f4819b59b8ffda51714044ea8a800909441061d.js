System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, ScoreUpdater;

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
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7c8afXFFrNPnKAjo53WONcq", "ScoreUpdater", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'RichText']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ScoreUpdater", ScoreUpdater = (_dec = ccclass('ScoreUpdater'), _dec2 = property({
        type: Node,
        tooltip: "Drag node with score text here"
      }), _dec3 = property({
        type: Node,
        tooltip: "Drag node with combo text here"
      }), _dec(_class = (_class2 = class ScoreUpdater extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "ScoreTextNode", _descriptor, this);

          _initializerDefineProperty(this, "ComboTextNode", _descriptor2, this);

          this.ScoreText = void 0;
          this.ComboText = void 0;
        }

        start() {
          this.node.on("score-update", this.updateScore, this);
          this.ScoreText = this.ScoreTextNode.getComponent("cc.RichText");
          this.ComboText = this.ComboTextNode.getComponent("cc.RichText");
          this.ScoreText.string = "Score = 0";
          this.ComboText.string = "Combo = 0";
        }

        updateScore(event) {
          console.log("Score: " + event.score);
          console.log("Combo: " + event.combo);
          this.ScoreText.string = "Score = " + event.score;
          this.ComboText.string = "Combo = " + event.combo;
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ScoreTextNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ComboTextNode", [_dec3], {
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
//# sourceMappingURL=8f4819b59b8ffda51714044ea8a800909441061d.js.map