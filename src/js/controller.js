/** @module Controller */

import { MAX_INSTRUCTION } from './config';

/**
 * Calls the approrpriate action
 *
 * @private
 * @param {string} char  Left/Right/Forward
 * @param {object} being: the object we're acting on
 * @return {boolean} is being lost?
 */
function _processCommands(char, being) {
  switch (char) {
    case 'L':
    case 'R':
      being.turn(char);
      break;
    case 'F':
      being.move();
      break;
    default:
      console.log(`Invalid command received while processing '${being.name}', moving to next character.`);
  }

  return being.isAlive; // dealbreaking flag, halts looping on false (robot lost)
}

/**
 *
 * @param   {object} being: robot or martian
 * @param   {string} instructionsStr: intructions for moving a robot or martian
 * @returns {object} returns a updated martian or robot
 */
export function instruct(being, instructionsStr) {
  const str = instructionsStr.trim().substring(0, MAX_INSTRUCTION);

  for (let i = 0; i < str.length; i++) {
    if (_processCommands(str.charAt(i).toUpperCase(), being) === false) {
      break;
    }
  }
  return being;
}
