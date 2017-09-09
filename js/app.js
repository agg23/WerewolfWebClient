var parser = new Parser();
var socketController = new SocketController(parser);
var gameController = new GameController(socketController);

parser.gameController = gameController;