import { ndnDice } from "../commands/utils/dice.mjs"
import { multiDice } from "../commands/utils/dice.mjs"
import { yabaDice } from "../commands/utils/dice.mjs"
import { bachaDice } from "../commands/utils/dice.mjs"
export default async(message) => {
  if (message.content.match(/ぽてと|ポテト|じゃがいも|ジャガイモ|🥔|🍟/)) {
    await message.react("🥔");
  }
  
  if (message.content.match(/にゃん|にゃーん|にゃ～ん/)) {
    await message.reply("にゃ～ん");
  }
  
const content = message.content.trim();

if (/^[\.。]?(ばちゃ|bacha|batya)\s*(\d+)?$/i.test(content)) {
    await message.reply(bachaDice(content));
} else if (/^[\.。]?(\d*)(やば|yaba|y)(\d+)(?:\s*(\d+))?$/i.test(content)) {
    await message.reply(yabaDice(content));
} else if (/^(\d*(やば|yaba|y)\d+)(\+(\d*(やば|yaba|y)\d+|\d+))*($| )/i.test(content)) {
    await message.reply(multiDice(content));
}
    if (message.content.match(/こまちゃん/)) {
    await message.react("<:komachan:1280403026498158604>");
  }
  
}
