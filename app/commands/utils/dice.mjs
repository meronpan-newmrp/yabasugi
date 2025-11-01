import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('dice')
  .setDescription('さいころを振るよ～（結果が2000文字を超えるとエラーになります）')
  .addStringOption(option =>
    option
      .setName('ndn')
      .setDescription('「1d6」形式でダイスロールを指定してね')
      .setRequired(true)
  );

export async function execute(interaction){
  const input = interaction.options.getString('ndn');
  if (!input.match(/^\d+d\d+$/)) {
    await interaction.reply('入力が正しくありません。');
    return;  
  }

	await interaction.reply(ndnDice(input));
}

export function bachaDice(input) {
  // 先頭に.や。があれば特別判定
  const special = /^[\.。]/.test(input);

  // 「ばちゃ」「bacha」「batya」＋数字（閾値）にマッチ
  const match = input.match(/^[\.。]?(ばちゃ|bacha|batya)\s*(\d+)?$/i);
  if (!match) return "コマンドが正しくありません。";

  const sides = 100; // ばちゃは常に100面
  const threshold = match[2] ? parseInt(match[2], 10) : null;
  const roll = Math.floor(Math.random() * sides) + 1;

  let result = `1やば${sides} >> [${roll}]`;

  if (threshold !== null) {
    result += `\n判定値: ${threshold}`;

    // 判定ロジック
    let judge = '';
    if (special && roll === 66) {
      judge = '致命的失敗！';
    } else if (special && roll === 77) {
      judge = '決定的成功！';
    } else if (roll >= 96 && roll > threshold) {
      judge = '致命的失敗！';
    } else if (roll <= 5 && roll <= threshold) {
      judge = '決定的成功！';
    } else if (roll <= threshold) {
      judge = '成功';
    } else {
      judge = '失敗';
    }

    result += `\n${judge}`;
  }

  return result;
}
export function ndnDice(ndn){
  const ndnArr = ndn.split('d');
  const number = ndnArr[0];
  const sides = ndnArr[1];
  
  const result = [];
  let sum = 0;

  for (let i = 0; i < number; i++) {
    const dice = Math.floor(Math.random() * sides) + 1;
    sum += dice;
    result.push(dice);
  }

	return `${number}d${sides} >> ${result}\n合計:${sum}`;
  
  
}
export function yabaDice(input) {
  // 先頭に.や。があるか判定
  const special = /^[\.。]/.test(input);

  // 例: 1やば100 60、2yaba100 5 などに対応
  const match = input.match(/^[\.。]?(\d*)(やば|yaba|y)(\d+)(?:\s*(\d+))?$/i);
  if (!match) return "コマンドが正しくありません。";

  const num = parseInt(match[1] || '1', 10);
  const sides = parseInt(match[3], 10);
  const threshold = match[4] ? parseInt(match[4], 10) : null;

  let rolls = [];
  let sum = 0;
  let judgeResults = [];

  for (let i = 0; i < num; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    sum += roll;

    if (threshold !== null) {
      // .や。がある場合は66/77を最優先
      if (special && roll === 66) {
        judgeResults.push('致命的失敗！');
      } else if (special && roll === 77) {
        judgeResults.push('決定的成功！');
      } else if (roll >= 96 && roll > threshold) {
        judgeResults.push('致命的失敗！');
      } else if (roll <= 5 && roll <= threshold) {
        judgeResults.push('決定的成功！');
      } else if (roll <= threshold) {
        judgeResults.push('成功');
      } else {
        judgeResults.push('失敗');
      }
    }
  }

  // 出力の組み立て
  let result = `${num}${match[2]}${sides} >> [${rolls.join(', ')}]`;

  // ダイスが2個以上のときのみ合計を表示
  if (num > 1) {
    result += ` 合計:${sum}`;
  }

  if (threshold !== null) {
    // 判定値表示
    result += `\n判定値: ${threshold}`;

    // 判定結果（複数ダイスの場合は混在時「成功／失敗」など）
    const uniqueResults = Array.from(new Set(judgeResults));
    result += `\n${uniqueResults.join('／')}`;
  }

  return result;
}
export function multiDice(input) {
  const [dicePart, thresholdPart] = input.split(' ');
  const diceExpressions = dicePart.split('+');
  let totalSum = 0;
  let output = '';
  let details = [];

  for (const expr of diceExpressions) {
    // ダイス式（やば/yaba/y対応）
    const diceMatch = expr.match(/^(\d*)(やば|yaba|y)(\d+)$/i);
    if (diceMatch) {
      const num = parseInt(diceMatch[1] || '1', 10);
      const sides = parseInt(diceMatch[3], 10);
      let rolls = [];
      let sum = 0;
      for (let i = 0; i < num; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        sum += roll;
      }
      // ダイス個数が2以上なら合計を表示
      if (num > 1) {
        details.push(`${num}${diceMatch[2]}${sides} >> [${rolls.join(', ')}] 合計:${sum}`);
      } else {
        details.push(`${num}${diceMatch[2]}${sides} >> [${rolls.join(', ')}]`);
      }
      totalSum += sum;
      continue;
    }
    // 定数
    const constMatch = expr.match(/^\d+$/);
    if (constMatch) {
      const value = parseInt(expr, 10);
      details.push(`定数: ${value}`);
      totalSum += value;
      continue;
    }
    // 不正な式
    details.push(`不正な式: ${expr}`);
  }

  output += details.join('\n');
  output += `\n全体合計: ${totalSum}`;

  if (thresholdPart && !isNaN(Number(thresholdPart))) {
    const threshold = Number(thresholdPart);
    output += `\n判定値: ${threshold}\n結果: ${totalSum <= threshold ? '成功' : '失敗'}`;
  }

  return output;
}