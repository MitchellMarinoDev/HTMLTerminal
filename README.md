HTMLTerminal
============
A HTML terminal that can be configured and used however.
Verry lightly based off of [HTML5 Web Terminal] (https://codepen.io/burncode/pen/YpbyVb) by **burncode**
I made this as a way to submit answers and get a new clue for a puzzle game
with a terminal looking environment, but it can be configured to to anything you would like.

Commands are fully customizable and can be created or edited in the commands.js script

To Use
------
To use this script, put this HTML in the webpage where you want the terminal to be
```HTML
<div id="terminal">
   <output></output>
   <div id="input-line" class="input-line">
       <div class="prompt">[Name@terminal] $ </div><div><input class="cmdline" autofocus /></div>
   </div>
</div>
```

You also need a script to create an instance of "terminal" and call .init()

``` Javascript
var term = new Terminal(commands);
term.init();
```
