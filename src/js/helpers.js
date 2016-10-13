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

export const emoji = new Map();
emoji.set(":sos:", "🆘");
emoji.set("N", "⬆️");
emoji.set("S", "⬇️");
emoji.set("E", "➡️");
emoji.set("W", "⬅️");

export function toEmoji(bot) {
  const sos = (bot.isAlive === false) ? " 🆘" : "";
  // emoji.get(bot.orientation)
  return `🤖 ${bot.x} ${bot.y} ${emoji.get(bot.orientation)}${sos}`;
}