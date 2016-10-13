export function isNumber(value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return true;
    return false;
}

export function isPositiveNumber(value) {
    if (isNumber(value) && value > 0) 
        return true;
    return false;
}

export function isPosSafe(pos, posBounds) {
    if(pos < 0 || pos > parseInt(posBounds, 10)) {
        return false;
    }
    else {
        return true;
    }
}


/*
 * auto pick from my emoji map instead of me formatting the string
 */
export function toEmoji(botStr) {
  const regex = /N|S|E|W|(\bLOST\b)/g;
  return `🤖 ${botStr.toString().replace(regex, strToEmoji)}`;
}

export function strToEmoji(match) {
  return emoji.get(match);
}

const emoji = new Map();
emoji.set("LOST", "🆘");
emoji.set("N", "⬆️");
emoji.set("S", "⬇️");
emoji.set("E", "➡️");
emoji.set("W", "⬅️");