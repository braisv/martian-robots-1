/** @module helpers **/

/**
 * 
 * @param   {number} value
 * @returns {boolean} confirm this is a integer
 */
export function isNumber(value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return true;
    return false;
}

/**
 * 
 * @param   {number} value [[Description]]
 * @returns {boolean} confirm this is a positve number
 */
export function isPositiveNumber(value) {
    if (isNumber(value) && value > 0) 
        return true;
    return false;
}

/**
 * 
 * @param   {number} position to validate
 * @param   {[[Type]]} boundaries to validate position against
 * @returns {boolean}
 */
export function isPosSafe(pos, posBounds) {
    if(pos < 0 || pos > Number.parseInt(posBounds, 10)) {
        return false;
    }
    else {
        return true;
    }
}


/**
 * Get emoji representation of being status
 * @param   {string} being status
 * @returns {string} transformed string
 */
export function beingAsEmoji(str) {
  const regex = /N|S|E|W|(\bLOST\b)|(\bMartian\b)|(\bRobot\b)/g;
  return `${str.replace(regex, strToEmoji)}`;
}

/*
 * matcher for str.replace
 */
export function strToEmoji(match) {
  return emoji.get(match);
}

const emoji = new Map();
emoji.set("LOST", "🆘");
emoji.set("N", "⬆️");
emoji.set("S", "⬇️");
emoji.set("E", "➡️");
emoji.set("W", "⬅️");
emoji.set("Martian", "👾");
emoji.set("Robot", "🤖");