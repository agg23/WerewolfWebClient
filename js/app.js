// var server = "192.168.1.155:8080";
var server = "werewolf.thehome.stream"
var parser = new Parser();
var socketController = new SocketController(parser, server, false);
var gameController = new GameController(socketController, server);

parser.gameController = gameController;

socketController.connect();