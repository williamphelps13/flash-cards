const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', function() {

  it('should be a function', function() {
    const turn = new Turn();

    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    const turn = new Turn();

    expect(turn).to.be.an.instanceof(Turn);
  });

  it('should store a guess', function() {
    const card = new Card();
    const turn = new Turn('object', card);

    expect(turn.guess).to.equal('object');
  });

  it('should store a card', function() {
    const card = new Card();
    const turn = new Turn('object', card);

    expect(turn.card).to.equal(card);
  });
  
  it('should return a guess', function() {
    const card = new Card();
    const turn = new Turn('object', card);

    const guess = turn.returnGuess();

    expect(guess).to.equal('object');
  });

  it('should return the card', function() {
    const card = new Card();
    const turn = new Turn('object', card);

    const returnedCard = turn.returnCard();

    expect(returnedCard).to.equal(card);
  });  

  it('should evaluate a guess', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);

    const guessEvaluation = turn.evaluateGuess();

    expect(guessEvaluation).to.equal(true);
  }); 

  it('should give feedback', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);

    const guessFeedback = turn.giveFeedback();

    expect(guessFeedback).to.equal('correct!');
  });
});