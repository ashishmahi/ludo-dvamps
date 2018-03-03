const assert = require('chai').assert;
const path = require('path');
const GameManager = require(path.resolve('src/models/gamesManager.js'));
const Game = require(path.resolve('src/models/game.js'));
const ColorDistributor = require(path.resolve('test/colorDistributer.js'));

const dice = function(){
  return 4;
}

const timeStamp = () => 1234;

describe('GameManager', () => {
  let gameManager;
  let game;
  beforeEach(() => {
    gameManager = new GameManager(ColorDistributer,dice,timeStamp);;
    game = gameManager.addGame('newGame');
  });
  describe('#addGame', () => {
    it('should create a new game with given name and store it', () => {
      let expected = new Game('newGame',ColorDistributor,dice,timeStamp);
      assert.deepEqual(game,expected );
      assert.instanceOf(game,Game);
    });
  });
  describe('#addPlayerTo', () => {
    it('should add player to given specific game', () => {
      gameManager.addPlayerTo('newGame', 'john');
      let expectedGame = new Game('newGame',ColorDistributor,dice,timeStamp);
      expectedGame.addPlayer('john');
      assert.deepEqual(gameManager.getGame('newGame'),expectedGame);
    });
  });
  describe('#getAvailableGames', () => {
    it(`should give empty list if all games have 4 players`, () => {
      gameManager.addPlayerTo('newGame', 'john');
      gameManager.addPlayerTo('newGame', 'sandy');
      gameManager.addPlayerTo('newGame', 'mandy');
      gameManager.addPlayerTo('newGame', 'alex');
      assert.deepEqual(gameManager.getAvailableGames(), []);
    });
    it(`should give all games which don't have 4 players`, () => {
      gameManager.addPlayerTo('newGame', 'john');
      gameManager.addPlayerTo('newGame', 'sandy');
      gameManager.addPlayerTo('newGame', 'mandy');
      let expectation = [{
        name:'newGame',
        remain:1,
        createdBy: 'john'
      }];
      assert.deepEqual(gameManager.getAvailableGames(), expectation);
    });
  });
  describe('#doesGameExists', () => {
    it('should return true if game of given name exists ', () => {
      assert.isOk(gameManager.doesGameExists('newGame'));
    });
    it('should return false if game of given name does not exists ', () => {
      assert.isNotOk(gameManager.doesGameExists('badGame'));
    });
  });
  describe('#getGame()', () => {
    it('should return Game', () => {
      let expected = new Game('newGame', ColorDistributor, dice,timeStamp);
      assert.deepEqual(gameManager.getGame('newGame'),expected);
      assert.isUndefined(gameManager.getGame('badGame'));
    });
  });
  describe('#finishGame', () => {
    it('should finish game and should delete game in 10 seconds', done => {
      let timeToDelete = 1;
      gameManager.addPlayerTo('newGame', 'john');
      gameManager.addPlayerTo('newGame', 'sandy');
      gameManager.addPlayerTo('newGame', 'mandy');
      gameManager.addPlayerTo('newGame', 'alex');
      gameManager.finishGame('newGame',timeToDelete);
      setTimeout(()=>{
        assert.isUndefined(gameManager.getGame('newGame'));
        done();
      },1500);
    });
  });
});
