const lib = require('../lib/utility.js');
const serveAvailableGames = function(req,res){
  let availableGames = req.app.gamesManager.getAvailableGames();
  res.send(availableGames);
};
const serveGameName=(req,res)=>{
  res.send(req.cookies.gameName);
};
const serveUserName=(req,res)=>{
  res.send(req.cookies.playerName);
};
const serveGameStatus=(req,res)=>{
  let gameName=req.cookies.gameName;
  let game = req.app.gamesManager.getGame(gameName);
  res.send(lib.toS(game.getStatus()));
};
module.exports = {
  serveAvailableGames,
  serveGameName,
  serveUserName,
  serveGameStatus
};