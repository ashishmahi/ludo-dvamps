const lib = require('../lib/utility.js');
const serveAvailableGames = function(req, res) {
  let availableGames = req.app.gamesManager.getAvailableGames();
  res.send(availableGames);
};
const serveGameName = (req, res) => {
  res.send(req.cookies.gameName);
};
const serveUserName = (req, res) => {
  res.send(req.cookies.playerName);
};
const serveGameStatus = (req, res) => {
  let gameName = req.cookies.gameName;
  let game = req.app.gamesManager.getGame(gameName);
  if (game == undefined) {
    res.end();
    return;
  }
  res.send(lib.toS(game.getStatus()));
};
// const resWithBadReq = function(res) {
//   res.statusCode = 400;
//   res.end();
// }
const getBoardStatus = function(req, res) {
  let game = req.game;
  res.json(game.getBoardStatus());
};
const getBoard = function(req, res) {
  let game = req.game;
  // if(!game) {
  //   return resWithBadReq(res);
  // }
  let board = req.app.fs.readFileSync('./public/board.html','utf8');
  let boardStatus = game.getBoardStatus();
  res.setHeader('Content-Type','text/html');
  res.send(setPlayersName(board,boardStatus));
  res.end();
};

const setPlayersName = function(board, boardStatus) {
  return board.replace('{{{GREEN}}}', boardStatus.green)
    .replace('{{{RED}}}', boardStatus.red)
    .replace('{{{BLUE}}}', boardStatus.blue)
    .replace('{{{YELLOW}}}', boardStatus.yellow);
};
module.exports = {
  serveAvailableGames,
  serveGameName,
  serveUserName,
  serveGameStatus,
  getBoardStatus,
  getBoard
};
