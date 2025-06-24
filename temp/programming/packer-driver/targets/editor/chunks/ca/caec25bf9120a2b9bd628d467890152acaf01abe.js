System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Prefab, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, CardController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCardScript(extras) {
    _reporterNs.report("CardScript", "./CardScript", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScoreEvaluator(extras) {
    _reporterNs.report("ScoreEvaluator", "./ScoreEvaluator", _context.meta, extras);
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
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f1c9ceDbnpJlYYKLIBiBmbq", "CardController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Node', 'Prefab', 'WidgetComponent']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CardController", CardController = (_dec = ccclass('CardController'), _dec2 = property({
        type: Prefab,
        tooltip: "Drag card prefab here"
      }), _dec3 = property({
        type: Number,
        tooltip: "Number of cards"
      }), _dec(_class = (_class2 = class CardController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "CardPrefab", _descriptor, this);

          _initializerDefineProperty(this, "NumCards", _descriptor2, this);

          this.ScoreEval = void 0;
        }

        onLoad() {
          for (let i = 0; i < this.NumCards; i++) {
            const childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            let cardScript = childCard.getComponent("CardScript");
            cardScript.init(false, "Testing"); // For layout adjustments

            let widget = childCard.getComponent("cc.Widget");
            widget.target = this.node;
          } // Get the evaluator script


          this.ScoreEval = this.node.getComponent("ScoreEvaluator");
        }

        start() {//this.testGetChildren();
        }

        update(deltaTime) {
          // test score evaluator: should return 0, 100 and -1 sequentially
          console.log(this.ScoreEval.getScore("testing", "testing"));
          console.log(this.ScoreEval.getScore("scored", "scored"));
          console.log(this.ScoreEval.getScore("mismatch", "another_mismatch"));
        }

        testGetChildren() {
          this.node.children.forEach(childNode => {
            console.log(childNode.name);
            let cardScript = childNode.getComponent("CardScript");

            if (cardScript) {
              console.log(cardScript.CardType, cardScript.FlippedUp);
            }
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "CardPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "NumCards", [_dec3], {
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
//# sourceMappingURL=caec25bf9120a2b9bd628d467890152acaf01abe.js.map