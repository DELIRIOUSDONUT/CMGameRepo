System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Layout, Prefab, AudioSource, CCFloat, CCInteger, ScreenSwitchEventRequest, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, CardController;

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

  function _reportPossibleCrUseOfSpriteHandler(extras) {
    _reporterNs.report("SpriteHandler", "./SpriteHandler", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScreenSwitchEventRequest(extras) {
    _reporterNs.report("ScreenSwitchEventRequest", "./ScreenSwitchRequestEvent", _context.meta, extras);
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
      Layout = _cc.Layout;
      Prefab = _cc.Prefab;
      AudioSource = _cc.AudioSource;
      CCFloat = _cc.CCFloat;
      CCInteger = _cc.CCInteger;
    }, function (_unresolved_2) {
      ScreenSwitchEventRequest = _unresolved_2.ScreenSwitchEventRequest;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f1c9ceDbnpJlYYKLIBiBmbq", "CardController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Layout', 'Node', 'Prefab', 'UITransform', 'Widget', 'Button', 'SpriteFrame', 'AudioSource', 'CCFloat']);

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
      }), _dec4 = property({
        type: CCInteger,
        tooltip: "Delay time for card flip"
      }), _dec5 = property({
        type: AudioSource,
        tooltip: "Audio source when cards match"
      }), _dec6 = property({
        type: AudioSource,
        tooltip: "Audio source when cards mismatch"
      }), _dec7 = property({
        type: AudioSource,
        tooltip: "Audio source when game is over"
      }), _dec8 = property({
        type: CCFloat,
        tooltip: "Delay time for victory jingle"
      }), _dec(_class = (_class2 = class CardController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "CardPrefab", _descriptor, this);

          _initializerDefineProperty(this, "NumCards", _descriptor2, this);

          _initializerDefineProperty(this, "FlipDelay", _descriptor3, this);

          this.ScoreEval = void 0;
          // Queue for tracking card selection events  --  for now use array, change to actual queue later
          // Stores ID of selected cards temporally, remove the first two on match/mismatch
          this.CardSelectedQueue = void 0;
          // Number of cards currently selected
          this.NumSelectedCards = void 0;
          // Object to keep track of player score
          this.ScoreCounter = void 0;
          // For keeping track of game states across restarts
          this.SaveState = {
            score: 0,
            combo: 0,
            cards: [],
            faceUpIndex: -1,
            removedCards: [],
            columnReq: 0,
            numCards: 0,
            turn: 0,
            matchCount: 0
          };
          // Number of columns required by Layout
          this.ColumnReq = void 0;
          // Dimensions of cards based on number of cards and requird columns
          this.childCardHeight = void 0;
          this.childCardWidth = void 0;
          this.SpriteHandler = void 0;

          // Properties for audio
          _initializerDefineProperty(this, "MatchAudioSource", _descriptor4, this);

          _initializerDefineProperty(this, "MismatchAudioSource", _descriptor5, this);

          _initializerDefineProperty(this, "GameOverAudioSource", _descriptor6, this);

          _initializerDefineProperty(this, "VictoryJingleDelay", _descriptor7, this);
        }

        start() {
          // Get requirements for card sizes and columns
          this.getCardSize(); // Get the evaluator script

          this.ScoreEval = this.node.getComponent("ScoreEvaluator"); // Get score tracker

          this.ScoreCounter = this.node.getComponent("ScoreCounter"); // Sprite handler

          this.SpriteHandler = this.node.getComponent("SpriteHandler"); // If save state exists and at least one pair is left

          if (this.loadIfAvailable()) {
            // Setup listener for card selection events
            this.setupCardMatchListener(); // No need to set up game

            return;
          } // By this point, failed to load save data, so set up game


          this.SaveState = {
            score: 0,
            combo: 0,
            cards: [],
            faceUpIndex: -1,
            removedCards: [],
            columnReq: 0,
            numCards: 0,
            turn: 0,
            matchCount: 0
          }; // First make sure that numcards is an even number (cant make pairs with odd num)

          if (this.NumCards % 2 != 0) {
            this.NumCards -= 1;
          }

          this.SaveState.columnReq = this.ColumnReq;
          this.SaveState.numCards = this.NumCards; // Get a random subset of card type pairs

          var shuffledTypes = this.getCardTypes(); // Instantiate all cards

          for (var i = 0; i < this.NumCards; i++) {
            var childCard = instantiate(this.CardPrefab);
            var childTransform = childCard.getComponent("cc.UITransform");
            childTransform.width = this.childCardWidth;
            childTransform.height = this.childCardHeight;
            this.node.addChild(childCard);
            var cardScript = childCard.getComponent("CardScript");
            cardScript.init(false, shuffledTypes[i], i); // For layout adjustments

            var widget = childCard.getComponent("cc.Widget");
            widget.target = this.node; // Add sprites

            this.SpriteHandler.setSprites(cardScript); // Save to save state

            this.SaveState.cards.push(shuffledTypes[i]);
            this.SaveState.removedCards.push(0);
          } // Setup listener for card selection events


          this.setupCardMatchListener();
        }

        update(deltaTime) {}

        setupCardMatchListener() {
          this.CardSelectedQueue = new Array();
          this.NumSelectedCards = this.SaveState.faceUpIndex == -1 ? 0 : 1; // In the case that the program was closed while one card was faceup

          if (this.NumSelectedCards == 1) {
            // Search for card with matching index, and add to queue
            for (var i = 0; i < this.NumCards; i++) {
              if (this.SaveState.faceUpIndex == i) {
                var child = this.node.children[i].getComponent("CardScript");
                this.CardSelectedQueue.push(child);
                child.setFlipStatus(true);
                break;
              }
            }
          }

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
              this.SaveState.faceUpIndex = card.CardID; // this works because the card id IS the index
              // While face up, cannot interact with it

              var button = card.getComponent("cc.Button");
              button.interactable = false;
            } else if (this.NumSelectedCards > 1) {
              // By this point, two cards are selected
              this.SaveState.faceUpIndex = -1;
              card.setFlipStatus(true);
              var score = this.ScoreEval.getScore(this.CardSelectedQueue[0].CardType, card.CardType);
              console.log("Score: ", score); // Pass score to score counter

              this.ScoreCounter.trackScore(score); // For save state

              this.SaveState.score = this.ScoreCounter.Score;
              this.SaveState.combo = this.ScoreCounter.ComboStreak; // Save combo to save state

              if (score <= 0) {
                // --------- MISMATCH -------------
                // Play audio source
                this.MismatchAudioSource.playOneShot(this.MismatchAudioSource.clip); // Do delay, then flip both cards face down

                var prevCard = this.CardSelectedQueue[0];
                this.scheduleOnce(() => {
                  prevCard.setFlipStatus(false);
                  card.setFlipStatus(false);
                }, this.FlipDelay); // Enable both buttons

                var button1 = this.CardSelectedQueue[0].getComponent("cc.Button");
                button1.interactable = true;
                var button2 = card.getComponent("cc.Button");
                button2.interactable = true; // Save state for combo

                this.SaveState.combo = 0;
              } else {
                // --------- MATCH -------------
                console.log("MATCH");
                console.log(this.CardSelectedQueue[0].CardType, card.CardType); // Play audio source

                this.MatchAudioSource.playOneShot(this.MatchAudioSource.clip); // Do delay, then disable both cards from rendering

                var _prevCard = this.CardSelectedQueue[0];
                this.scheduleOnce(() => {
                  _prevCard.disable();

                  card.disable();
                  this.SaveState.turn += 1;
                }, this.FlipDelay); // Add disabled cards to save state

                this.SaveState.removedCards[this.CardSelectedQueue[0].CardID] = 1;
                this.SaveState.removedCards[card.CardID] = 1;
              } // Eject the first two queue entries which are the two selected cards


              this.NumSelectedCards -= 2;
              this.CardSelectedQueue.shift();
              this.CardSelectedQueue.shift(); // Save states for turn and match count

              this.SaveState.turn = this.ScoreCounter.Turn;
              this.SaveState.matchCount = this.ScoreCounter.MatchCount;
            } else {
              console.log("ERROR: Num selected cards: ", this.NumSelectedCards);
            }

            console.log(this.SaveState); // if all cards are removed, no need to save state as game is over

            if (this.SaveState.removedCards.every(val => val == 1)) {
              // Play game over audio source
              this.scheduleOnce(() => {
                this.GameOverAudioSource.playOneShot(this.GameOverAudioSource.clip);
                this.node.dispatchEvent(new (_crd && ScreenSwitchEventRequest === void 0 ? (_reportPossibleCrUseOfScreenSwitchEventRequest({
                  error: Error()
                }), ScreenSwitchEventRequest) : ScreenSwitchEventRequest)("victory"));
              }, this.VictoryJingleDelay);
              localStorage.removeItem("saveState");
            } else {
              localStorage.setItem("saveState", JSON.stringify(this.SaveState));
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

        getCardSize() {
          // For NumCards, adjust the size of the cell such that they fit perfectly in the container
          // Need to reference the column constraint 
          var parentLayout = this.node.getComponent("cc.Layout");
          var parentTransform = this.node.getComponent("cc.UITransform");
          var parentWidth = parentTransform.contentSize.width;
          var parentHeight = parentTransform.contentSize.height;

          if (parentLayout.constraint == Layout.Constraint.FIXED_COL) {
            var numCols = parentLayout.constraintNum;
            this.ColumnReq = numCols;

            if (this.NumCards >= numCols) {
              // Have to be the full size
              // Adjust width to fit
              console.log("Parent width ", parentWidth, ", parent height ", parentHeight);
              this.childCardWidth = (parentWidth - (numCols - 1) * parentLayout.spacingX) / numCols; // Adjust height to fit

              var numRows = Math.ceil(this.NumCards / numCols);
              console.log("Num rows is ", numRows);
              this.childCardHeight = (parentHeight - (numRows - 1) * parentLayout.spacingY) / numRows;
            } else {
              // Grow the children
              return;
            }
          }
        }

        loadIfAvailable() {
          if (localStorage.getItem("saveState")) {
            console.log("Fetched save data");
            this.SaveState = JSON.parse(localStorage.getItem("saveState"));
            console.log("savedata: column req:" + this.SaveState.columnReq);
            console.log("savedata numcards: " + this.SaveState.numCards);
            console.log("savedata score: " + this.SaveState.score);
            console.log("savedata combo: " + this.SaveState.combo);

            if (this.SaveState.columnReq != this.ColumnReq) {
              console.log("Column req not met", this.SaveState.columnReq, this.ColumnReq);
              return false;
            } else if (this.SaveState.cards.length != this.NumCards) {
              console.log("Num cards not met", this.SaveState.cards.length, this.NumCards);
              return false;
            } else {
              console.log("Parse success");
              console.log(this.SaveState.cards); // parse from here

              this.NumCards = this.SaveState.cards.length;
              this.ScoreCounter.Score = this.SaveState.score;
              this.ScoreCounter.ComboStreak = this.SaveState.combo;
              this.ScoreCounter.Turn = this.SaveState.turn;
              this.ScoreCounter.MatchCount = this.SaveState.matchCount;
              this.ScoreCounter.sendUpdate();

              for (var i = 0; i < this.SaveState.numCards; i++) {
                var childCard = instantiate(this.CardPrefab);
                var childTransform = childCard.getComponent("cc.UITransform");
                childTransform.width = this.childCardWidth;
                childTransform.height = this.childCardHeight;
                this.node.addChild(childCard);
                var cardScript = this.node.children[i].getComponent("CardScript");
                cardScript.init(false, this.SaveState.cards[i], i); // Add sprites

                this.SpriteHandler.setSprites(cardScript);

                if (this.SaveState.faceUpIndex == i) {
                  cardScript.setFlipStatus(true);
                }

                if (this.SaveState.removedCards[i] == 1) {
                  cardScript.disable();
                }
              }

              return true;
            }
          } else {
            return false;
          }
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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "FlipDelay", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "MatchAudioSource", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "MismatchAudioSource", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "GameOverAudioSource", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "VictoryJingleDelay", [_dec8], {
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