const Turn = require('./Turn')

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.currentCard = deck.cards[0];
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.currentCard
  } 

  takeTurn(guess) {
    const turn = new Turn(guess, this.currentCard);
    this.turns++;
    if (!turn.evaluateGuess()) {
      this.incorrectGuesses.push(this.currentCard.id)
    }
    this.currentCard = this.deck[this.turns];
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    return (this.turns - this.incorrectGuesses.length) / this.turns * 100;
  }

  endRound() {
    const endMessage = `**d over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
    console.log(endMessage);
    return endMessage;
  }
}
module.exports = Round;