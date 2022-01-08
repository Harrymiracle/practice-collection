/**
 * Created by ly on 2015/8/18.
 */
var bole = require("bole");
    boleConsole = require("bole-console"),
    config = require("../config");

var boleConsoleStream = boleConsole({
    timestamp: true,
    hostname: true,
    pid: true,
    requestDetails: true
});
bole.output([
    {level: "debug", stream: boleConsoleStream},
    //{level: "info", stream: boleConsoleStream },
    //{level: "warn", stream: boleConsoleStream},
    //{level: "error", stream: boleConsoleStream}
]);
var boleLog = bole(config.usergroup);

module.exports = {
    boleLog: boleLog
};

