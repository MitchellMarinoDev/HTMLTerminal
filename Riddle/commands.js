// To just edit the hints, clues and aswers, 
// EDIT HERE ***************
//
// Put each clue in '' and in []. Ex 'clue'
// to escape a ', type in \'
var clue = [
    'Clue for riddle 1',
    'Clue for riddle 2',
    'Clue for riddle 3'
];
// Put each answer in '' and in []. Ex ['answer']
// To have multiple answers for the same question put them all in []. Ex. ['answer1', 'answer2']
var answer = [
    ['answer for riddle 1'],
    ['answer for riddle 2', 'alternate answer for riddle 2'],
    ['Caps do Not Matter'],
];
// Put each hint in '' and in []. Ex ['hint']
// To have multiple hints for the same question put them all in []. Ex. ['hint1', 'hint2']
// you must have empty [] for each riddle that you don't want hints for.
var hint = [
    ['hint for riddle 1'],
    ['hint for riddle 2', 'alternate hint for riddle 2'],
    [] // no hints for riddle 3
];
//END EDITING ***************


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
var hintCount = 0;
var debugMode = false;
var currentRiddle = 1;

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

// Submit - The command used to submit an answer to your current riddle
var submitCMD = new CMD('submit', function (args) {
    if (currentRiddle > answer.length) { output('You have already compleated all the puzzles.'); return; } // there are no more puzzles
    if (args.length == 0) {
        output('usage: submit &lt;answer&gt;');
        return;
    }
    //build answer from all args, for words with spaces
    var builtAnswer = args.join(' ');
    builtAnswer = builtAnswer.toLowerCase();
    // check through all possible answers
    var correct = false;
    for (i = 0; i < answer[currentRiddle - 1].length; i++) {
        if (debugMode) output('Checking "' + builtAnswer + '" against "' + answer[currentRiddle - 1][i].toLowerCase() + '" with index of ' + i);
        if (builtAnswer == answer[currentRiddle - 1][i].toLowerCase()) {
            correct = true;
        }
    }

    if (correct) { // if any answer is correct
        currentRiddle++; // Go to next riddle
        hintCount = 0; // reset hint counter
        // Special cases start here
        if (currentRiddle == 16) {
            output('<p style="font-weight:bold; color:blue;">Nice Job, that is the correct answer! Enter "clue" for your next clue. <br> This will be your last clue. Show your answer to mom. \n Happy 17th Birthday! We love you!</p>');
        }
        else if (currentRiddle > answer.length) {
            // no more answers
            output('Congradulations! you compleated all of the puzzles!');
        }

        // Special cases end here
        else {
            output('Nice Job, that is the correct answer! Enter "clue" for your next clue.'); // default answer
        }
    } else {
        output('Sorry, that is not the right answer. Try again.');
        if (debugMode) { // ouput debugging help
            output('you tried to submit "' + builtAnswer + '"');
            output('the correct answer is "' + answer[currentRiddle - 1][0] + '"');
        }
    }
});
submitCMD.help = 'The command used to submit an answer to your current riddle';

// Clue - The command used to get the clue for your current riddle
var clueCMD = new CMD('clue', function (args) {
    if (currentRiddle > answer.length) { output('You have already compleated all the puzzles.'); return; } // there are no more puzzles
    output(clue[currentRiddle - 1]);
});
clueCMD.help = 'The command used to get the clue for your current riddle';

// Current Riddle - Lists the current riddle
var currentRiddleCMD = new CMD('currentriddle', function (args) {
    if (args.length == 1 && debugMode) {
        if (isNaN(args[0])) {
            output('make sure that arg is a number');
            return;
        }
        currentRiddle = args[0];
    }
    output(currentRiddle);
});
currentRiddleCMD.help = 'Lists the current riddle';
currentRiddleCMD.alias = ['cr'];

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

// Hint - Prints out hints for the current riddle, if they are available
var hintCMD = new CMD('hint', function (args) {
    if (currentRiddle > answer.length) { output('You have already compleated all the puzzles.'); return; } // there are no more puzzles
    if (hint[currentRiddle - 1].length == 0) {
        output("No Hints Avalable");
        return;
    }
    if (args.length == 0) { // no hint specified; suggest one
        output(hint[currentRiddle - 1][hintCount]);
        // Increment hintCount, unless it is on the last hint. Then reset it
        if (hintCount < hint[currentRiddle - 1].length - 1) {
            hintCount++;
        } else {
            hintCount = 0;
        }
    } // Hint Specified, Give them that hint, unless it is too high
    else if (args.length == 1) {
        if (hint[currentRiddle - 1][args[0] - 1] != undefined) {
            output(hint[currentRiddle - 1][args[0] - 1]);
            hintCount = args[0] - 1; // set hint counter to selected hint

            if (hintCount < hint[currentRiddle - 1].length - 1) { // + 1 if that is a valid hint #
                hintCount++;
            } else {
                hintCount = 0;
            }
        } else {
            output('That is not a valid hint number');
        }
    } else {
        output('usage: hint, or hint &lt;hint number&gt;');
    }
});
hintCMD.help = 'Prints out hints for the current riddle, if they are available';
initCommands();
Terminal(commands);