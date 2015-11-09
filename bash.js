var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');

// the stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline

  process.stdout.write(commands.parseCmd(cmd));

  process.stdout.write('\nprompt > ');
});
