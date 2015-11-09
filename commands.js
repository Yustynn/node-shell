var fs = require('fs');

var commands = {
  pwd: function(inputs) { parseResponse(__dirname); },
  date: function(inputs) { parseResponse(Date()); },
  ls: ls,
  echo: echo,
  default: function(inputs) { parseResponse('You typed: ' + inputs.join(' ')); }
}



function parseCmd(cmd) {
  var inputs = cmd.split(' ');

  return (commands[inputs[0]] || commands['default'])(inputs);
}

function echo(inputs) {
  parseResponse(inputs.slice(1).join(' '));
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
