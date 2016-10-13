import { MAX_INSTRUCTION } from './config.js';

export function instructBot(bot, instructionsStr) {

  instructionsStr = instructionsStr.trim().substring(0, MAX_INSTRUCTION); // limit instructions to defined limit

  for (var i = 0; i < instructionsStr.length; i++) {
      if(_processCommands(instructionsStr.charAt(i).toUpperCase(), bot) === false) {
          break;
      }
  }
  return bot;
}

function _processCommands(char, bot) {
  switch (char) {
    case "L":
    case "R":
        bot.turn(char);
        break;
    case "F":
        bot.move();
        break;
    default: 
        console.log("Invalid command received while processing '" + bot.name + "', moving to next character.");
  }

  return bot.isAlive; // dealbreaking flag, halts looping on false (robot lost)
}