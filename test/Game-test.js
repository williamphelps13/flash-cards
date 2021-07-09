const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Game = require('../src/Game');

describe('Round', function() {
  let card1, card2, card3, card4, deck, round, game;

  beforeEach(function() {
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    card4 = new Card(4, 'What type of prototype method does not modify the existing array but returns a particular representation of the array?', ['mutator method', 'accessor method', 'iteration method'], 'accessor method')
    deck = new Deck([card1, card2, card3, card4]);
    round = new Round(deck);
    game = new Game();
  });
  
  it('should be a function', function() {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', function() {
    expect(game).to.be.an.instanceof(Game);
  }); 

  it('should start with the correct current round', function() {
    this.currentRound = round;

    expect(this.currentRound).to.deep.equal({
      deck: [card1, card2, card3, card4],
      currentCard: card1,
      turns: 0,
      incorrectGuesses: []
    });
  }); 

  it('should keep track of the current round after one incorrect guess', function() {
    round.takeTurn('array');
    
    this.currentRound = round;

    expect(this.currentRound).to.deep.equal({
      deck: [card1, card2, card3, card4],
      currentCard: card2,
      turns: 1,
      incorrectGuesses: [1]
    });
  }); 
});