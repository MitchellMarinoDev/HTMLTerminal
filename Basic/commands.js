class CMD {
    constructor(name, run) {
        this.name = name;
        this.run = run;
    }
    showInCmd = true;
    help = 'Help page for this command is not defined';
    alias = [];
}
var commands;
function initCommands() {
    // Put all commands to be used in here
    commands = [
        helpCMD, clearCMD, debugCMD, submitCMD, clueCMD, currentRiddleCMD, echoCMD, dateCMD, hintCMD
    ];
}

// Define Commands and vars here, and put the commands in commands[]
// Vars
var debugMode = false;


// COMMANDS

// Help - Gives you help on how to use the terminal
var helpCMD = new CMD('help', function (args) {
    if (args.length == 0) { // No args print normal help menu
        // General Help:
        output('To submit an answer, enter in submit &lt;answer&gt;. To get a clue, enter clue.To get a list of commands, enter cmd.');
        // CMD list
        output('Command List:');
        var list;
        list = '<div class="cmdList">';
        for (i = 0; i < commands.length; i++) {
            if (commands[i].showInCmd) {
                list += commands[i].name;
                var k;
                for (k = 0; k < commands[i].alias.length; k++) {
                    list += ', ' + commands[i].alias[k];
                }
                list += '<br/>';
            }
        }
        list += '</div>';
        output(list);
    } else { // 1 or more args, only use first arg
        var foundCommand = getCommandByName(args);
        if (foundCommand != null) {
            output("Help for " + foundCommand.name + ':');
            output(foundCommand.help);
        } else {
            output(args[0] + ': command not found');
        }
    }
});
helpCMD.alias = ['cmd', 'man']
helpCMD.help = 'gives you help on how to use the terminal, and lists commands <br/> running "help &lt;command&gt;", will tell you about that command';

// Clear - Clears the terminal
var clearCMD = new CMD('clear', function (args) {
    outputHTML.innerHTML = '';
});
clearCMD.help = 'Clears the terminal';

// Debug - Turns on debuging tools
var debugCMD = new CMD('debug', function (args) {
    debugMode = !debugMode;
    output(debugMode);
});
debugCMD.help = 'Turns on debuging tools';
debugCMD.showInCmd = false;

// Echo - Prints out the argurments
var echoCMD = new CMD('echo', function (args) {
    output(args.join(' '));
});
echoCMD.help = 'Prints out the argurments';

// Date - Prints the date
var dateCMD = new CMD('date', function (args) {
    output(new Date());
});
dateCMD.help = 'Prints the date';

initCommands();
Terminal(commands);