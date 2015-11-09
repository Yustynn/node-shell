var fs = require('fs');

var commands = {
  pwd: function() { parseResponse(__dirname); },
  date: function() { parseResponse(Date()); },
  ls: ls,
  default: function(cmd) { parseResponse('You typed: ' + cmd); }
}
function parseCmd(cmd) {
  
  return (commands[cmd] || commands['default'])(cmd);
}
function ls() {
  fs.readdir('.', function(err, files){
    if(err) throw err;
    var result = [];
    files.forEach(function(file){
      result.push(file.toString());
    });
    parseResponse(result.join(" "));
  });
}
function parseResponse(response){
  process.stdout.write(response + "\nprompt >");
}

module.exports.parseCmd = parseCmd;
