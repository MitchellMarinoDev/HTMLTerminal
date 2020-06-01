HTMLTerminal
============
A HTML terminal that can be configured and used however.
Very lightly based off of [HTML5 Web Terminal](https://codepen.io/burncode/pen/YpbyVb) by **burncode**.
I made this as a way to submit answers and get a new clue for a puzzle game
with a terminal looking environment, but it can be configured to to have any commands you would like.

I included a basic version, and a version close to the one I used for the puzzle game.

**Only tested in Google Chrome**

Commands are customizable and can be created or edited in the commands.js script

To Use
------
To use this script, put this HTML into the webpage where you want the terminal to be, or just use the basic version as a template.
```HTML
<div id="terminal">
   <output></output>
   <div id="input-line" class="input-line">
       <div class="prompt">[Name@terminal] $ </div><div><input class="cmdline" autofocus spellcheck="false"/></div>
   </div>
</div>
```
