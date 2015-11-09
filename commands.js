 var commands = {
  pwd: function() { return __dirname; },
  date: function() { return Date(); },
  default: function(cmd) { return 'You typed: ' + cmd; }
}

function parseCmd(cmd) {
  return (commands[cmd] || commands['default'])(cmd);
}

module.exports.parseCmd = parseCmd;
