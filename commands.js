var fs = require('fs');

var commands = {
  pwd: function(inputs) { parseResponse(__dirname); },
  date: function(inputs) { parseResponse(Date()); },
  ls: ls,
  echo: echo,
  cat: cat,
  head: head,
  tail: tail,
  sort: sort,
  default: function(inputs) { parseResponse('You typed: ' + inputs.join(' '));}
}

function parseCmd(cmd) {
  var inputs = cmd.split(' ');

  return (commands[inputs[0]] || commands['default'])(inputs);
}

function echo(inputs) {
  parseResponse(inputs.slice(1).join(' '));
}
function cat(inputs){
  readFile(inputs[1],function(contents){
    parseResponse(contents);
    if(inputs.length > 2) cat(inputs.slice(1));
  });
}
//  fs.readFile('./' + inputs[1],function(err,contents){
//    if(err) throw err;
//    parseResponse(contents);
//    if(inputs.length > 2) cat(inputs.slice(1));
//  });

function ls(inputs) {
  fs.readdir('.', function(err, files){
    if(err) throw err;
    var result = [];
    files.forEach(function(file){
      result.push(file.toString());
    });
    parseResponse(result.join(" "));
  });
}
function head(inputs){
  readFile(inputs[1],function(contents){
    var lines = new String(contents).split("\n");
    parseResponse(lines.slice(0,5).join("\n"));
  });
}
function tail(inputs){
  readFile(inputs[1],function(contents){
    var result = new String(contents).split("\n").filter(function(line, index, array){
      return index > array.length - 6;
    }).join("\n");
    parseResponse(result);
  });
}
function sort(inputs){
  readFile(inputs[1],function(contents){
    var result = new String(contents).split("\n").sort(function(a, b){
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() === b.toLowerCase()) return 0;
    }).join("\n");
    parseResponse(result);
  });
}

function readFile(input, f){
  fs.readFile('./' + input, function(err,contents){
    if (err) throw err;
    f(contents);
  });
}

function parseResponse(response){
  process.stdout.write(response + "\nprompt >");
}

module.exports.parseCmd = parseCmd;
