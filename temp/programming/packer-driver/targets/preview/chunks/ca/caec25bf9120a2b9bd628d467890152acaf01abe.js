System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Prefab, CCInteger, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, CardController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  // Using the Fisher-Yates shuffle to shuffle an array
  function shuffleArray(array) {
    var currentIndex = array.length,
        randomIndex; // While there remain elements to shuffle.

    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; // And swap it with the current element.

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function _reportPossibleCrUseOfCardScript(extras) {
    _reporterNs.report("CardScript", "./CardScript", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScoreEvaluator(extras) {
    _reporterNs.report("ScoreEvaluator", "./ScoreEvaluator", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardSelectEvent(extras) {
    _reporterNs.report("CardSelectEvent", "./CardSelectEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScoreCounter(extras) {
    _reporterNs.report("ScoreCounter", "./ScoreCounter", _context.meta, extras);
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
      CCInteger = _cc.CCInteger;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f1c9ceDbnpJlYYKLIBiBmbq", "CardController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Node', 'Prefab', 'Widget']);

      __checkObsolete__(['CCInteger']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CardController", CardController = (_dec = ccclass('CardController'), _dec2 = property({
        type: Prefab,
        tooltip: "Drag card prefab here"
      }), _dec3 = property({
        type: CCInteger,
        tooltip: "Number of cards"
      }), _dec(_class = (_class2 = class CardController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "CardPrefab", _descriptor, this);

          _initializerDefineProperty(this, "NumCards", _descriptor2, this);

          this.ScoreEval = void 0;
          // Queue for tracking card selection events  --  for now use array, change to actual queue later
          // Stores ID of selected cards temporally, remove the first two on match/mismatch
          this.CardSelectedQueue = void 0;
          // Number of cards currently selected
          this.NumSelectedCards = void 0;
          // Assuming that number of cards is even, there must be NumCards/2 unique pairs
          // However, can have repeated pairs if run out of card types
          // For now, use 5 card types 
          // Object to keep track of player score
          this.ScoreCounter = void 0;
        }

        onLoad() {}

        start() {
          // First make sure that numcards is an even number (cant make pairs with odd num)
          if (this.NumCards % 2 != 0) {
            this.NumCards -= 1;
          } // Get the evaluator script


          this.ScoreEval = this.node.getComponent("ScoreEvaluator"); // Get a random subset of card type pairs

          var shuffledTypes = this.getCardTypes(); // Instantiate all cards

          for (var i = 0; i < this.NumCards; i++) {
            var childCard = instantiate(this.CardPrefab);
            this.node.addChild(childCard);
            var cardScript = childCard.getComponent("CardScript");
            cardScript.init(false, shuffledTypes[i], i); // todo change this to randomly spreading different matches
            // For layout adjustments

            var widget = childCard.getComponent("cc.Widget");
            widget.target = this.node;
          } // Setup listener for card selection events


          this.setupCardMatchListener(); // Get score tracker

          this.ScoreCounter = this.node.getComponent("ScoreCounter");
        }

        update(deltaTime) {}

        testGetChildren() {
          this.node.children.forEach(childNode => {
            console.log(childNode.name);
            var cardScript = childNode.getComponent("CardScript");

            if (cardScript) {
              console.log(cardScript.CardType, cardScript.FlippedUp);
            }
          });
        }

        setupCardMatchListener() {
          this.CardSelectedQueue = new Array();
          this.NumSelectedCards = 0;
          this.node.on("card-selected", event => {
            var card = event.card; // Stop event propagation

            event.propagationStopped = true;
            console.log("SELECTED CARD ID: ", card.CardID, " CARD TYPE: ", card.CardType); // Handle animation logic here
            // Check if this card is already face up. If it is then early return

            if (card.FlippedUp) {
              return;
            } // First add to queue


            this.CardSelectedQueue.push(card);
            this.NumSelectedCards++; // If no other cards selected, can flip face up

            if (this.NumSelectedCards == 1) {
              // Flip face up
              card.setFlipStatus(true);
            } else if (this.NumSelectedCards > 1) {
              // By this point, two cards are selected
              card.setFlipStatus(true);
              var score = this.ScoreEval.getScore(this.CardSelectedQueue[0].CardType, card.CardType);
              console.log("Score: ", score); // Pass score to score counter

              this.ScoreCounter.trackScore(score);

              if (score <= 0) {
                // Mismatch
                // Do delay, then flip both cards face down
                this.CardSelectedQueue[0].setFlipStatus(false);
                card.setFlipStatus(false);
              } else {
                // Match
                // Do delay, then disable both cards from rendering
                this.CardSelectedQueue[0].disable();
                card.disable();
              } // Eject the first two queue entries which are the two selected cards


              this.NumSelectedCards -= 2;
              this.CardSelectedQueue.shift();
              this.CardSelectedQueue.shift();
            } else {
              console.log("ERROR: Num selected cards: ", this.NumSelectedCards);
            }
          });
        }

        getCardTypes() {
          // From the score evaluator, get the list of scoring card types
          var scoringTypes = Array.from(this.ScoreEval.scoreHashMap.keys());
          scoringTypes = shuffleArray(scoringTypes);
          console.log(scoringTypes);
          var numTypes = this.NumCards / 2;
          var shuffledTypes = new Array(); // Get the first numTypes shuffled types from the evaluator, and only use those for this game

          console.log(shuffledTypes);

          for (var i = 0; i < numTypes; i++) {
            // Push twice since we need pairs
            shuffledTypes.push(scoringTypes[i]);
            shuffledTypes.push(scoringTypes[i]);
            console.log(shuffledTypes);
          } //console.log(shuffledTypes);


          shuffledTypes = shuffleArray(shuffledTypes);
          return shuffledTypes;
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