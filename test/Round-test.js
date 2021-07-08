const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn= require('../src/Turn');

describe('Round', function() {
  let card1, card2, card3, card4, deck, round;

  beforeEach(function() {
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    card4 = new Card(4, 'What type of prototype method does not modify the existing array but returns a particular representation of the array?', ['mutator method', 'accessor method', 'iteration method'], 'accessor method')
    deck = new Deck([card1, card2, card3, card4]);
    round = new Round(deck);
  });

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    expect(round).to.be.an.instanceof(Round);
  }); 

  it('should store deck of cards', function() {
    expect(round.deck).to.deep.equal([card1, card2, card3, card4]);
  });  

  it('should return first card in deck', function() {
    let firstCard = round.returnCurrentCard();

    expect(firstCard).to.equal(card1);
  });  

  it('should start at 0 turn', function() {
    expect(round.turns).to.equal(0);
  }); 

  it('should start with no guesses', function() {
    expect(round.incorrectGuesses.length).to.equal(0);
  }); 

  it('should return correct when guess is the correct answer', function() {
    const correctGuess = round.takeTurn('object');

    expect(correctGuess).to.equal('correct!');
  }); 

  it('should return incorrect when guess is not the correct answer', function() {
    const correctGuess = round.takeTurn('array');

    expect(correctGuess).to.equal('incorrect!');
  }); 

  it('should increment from turn 0 to turn 2 after two guesses', function() {
    round.takeTurn('object');
    round.takeTurn('array');

    expect(round.turns).to.equal(2);
  }); 

  it('should store if of only incorrect guesses', function() {
    round.takeTurn('object');
    round.takeTurn('object');

    expect(round.incorrectGuesses).to.deep.equal([2]);
  });

  it('should return second card in deck after one guess', function() {
    round.takeTurn('object');

    let secondCard = round.returnCurrentCard();

    expect(secondCard).to.equal(card2);
  });  

  it('should calculate percent correct', function() {
    round.takeTurn('object'); //correct
    round.takeTurn('array'); //correct
    round.takeTurn('accessor method'); //incorrect
    round.takeTurn('iteration method'); //incorrect
    const percentCorrect = round.calculatePercentCorrect()

    expect(percentCorrect).to.equal(50);
  });  

  it('should print "round over" message', function() {
    round.takeTurn('object'); //correct
    round.takeTurn('array'); //correct
    round.takeTurn('accessor method'); //incorrect
    round.takeTurn('iteration method'); //incorrect
    const endRoundMessage = round.endRound();

    expect(endRoundMessage).to.equal('** Round over! ** You answered 50% of the questions correctly!');
  });
});