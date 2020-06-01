/*
 * HTML terminal with customizable commands
 * By Mitchell Marino
 * 
 * Version V1.1
 * TODO: 
 * - For V1.2
 * Add tab to complete
 * 
 * Errors:
 * when you go up in history, the cursor is at the begining. (Not important)
 */

var cmdLineHTML = document.querySelector('#input-line .cmdline');
var outputHTML = document.querySelector('#terminal output');

var Terminal = Terminal || function (Commands) {
    var i;
    var matched;

    var history = []; // to store history
    var histpos = 0; // a cursor in the history
    var histtemp = 0;

    // select the 

    // _____________________EVENTS_____________________
    // When you click back to the the terminal, focus the cmd line, and set the cursor to the end
    window.addEventListener('click', function (e) { cmdLineHTML.focus(); }, false);

    // For History checks if you press the up or down arrows
    cmdLineHTML.addEventListener('keydown', historyHandler, false);

    function historyHandler(e) {
        if (history.length) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                if (history[histpos]) {
                    history[histpos] = this.value;
                } else {
                    histtemp = this.value;
                }
            }
            if (e.keyCode == 38) { // up
                histpos--;
                if (histpos < 0) {
                    histpos = 0;
                }
            } else if (e.keyCode == 40) { // down
                histpos++;
                if (histpos > history.length) {
                    histpos = history.length;
                }
            }
            if (e.keyCode == 38 || e.keyCode == 40) {
                this.value = history[histpos] ? history[histpos] : histtemp;
                //this.value = this.value; // Sets cursor to end of input.
            }
        }
    }

    cmdLineHTML.addEventListener('keydown', processNewCommand, false);

    // look where this is being called
    function processNewCommand(e) {
        // put tab to compleate as a new event and hadeler or, better yet, combine into one
        if (e.keyCode == 9) { // 9: Tab
            e.preventDefault();
            // Implement tab suggest.
        } else if (e.keyCode == 13) { // 13: Enter
            // Save shell history.
            if (this.value) {
                history[history.length] = this.value; // add the current command to the history
                histpos = history.length;
            }

            // Duplicate current input and append to output section.
            var line = this.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id')
            line.classList.add('line');
            var input = line.querySelector('input.cmdline');
            input.autofocus = false;
            input.readOnly = true;
            outputHTML.appendChild(line);
            // Parse the new command
            if (this.value && this.value.trim()) {
                var args = this.value.split(' ').filter(function (val, i) {
                    return val;
                });
                var cmd = args[0].toLowerCase();
                args = args.splice(1); // Remove cmd from arg list.
            }

            // Find command and run it
            var foundCommand = getCommandByName(cmd);
            if (foundCommand != null) {
                foundCommand.run(args);
            } else {
                output(cmd + ': command not found');
            }



            window.scrollTo(0, getDocHeight_()); // After the command was entered, scroll down.
            this.value = ''; // Clear line for next input. 
        }
    }

    // Cross-browser support; get document's dimentions
    function getDocHeight_() {
        var d = document;
        return Math.max(
            Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
            Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
            Math.max(d.body.clientHeight, d.documentElement.clientHeight)
        );
    }
};

function output(html) {
    outputHTML.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
}

function getCommandByName(name) { // Returns first command in the command list with that name or alias.
    for (i = 0; i < commands.length; i++) { // for each command
        if (name == commands[i].name) {
            // return found command
            return commands[i];
        }
        var j; // loop for each alias too
        for (j = 0; j < commands[i].alias.length; j++) {
            if (name == commands[i].alias[j]) {
                // return found command
                return commands[i];
            }
        }
    }
    // if none are found,
    return null;
}