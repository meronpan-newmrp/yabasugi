import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

// コマンドデータ定義（execute関数の外で定義）
export const data = new SlashCommandBuilder()
  .setName('yomu')
  .setDescription('詠むよ')
  .addSubcommand(subcommand =>
    subcommand
      .setName('haiku')
      .setDescription('やばすぎ俳句を')
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('tanka')
      .setDescription('やばすぎ短歌を')
  );

// 単語リストなど関数外で定義
const words = [
  { word: "やば", len: 2 },
  { word: "そ", len: 1 },
  { word: "すぎ", len: 3 },
  { word: "そう", len: 2 },
  { word: "ちゃ", len: 1 },
  { word: "ちゃん", len: 2 },
];

function generateLine(targetLength) {
  let length = 0;
  let lineWords = [];
  while (length < targetLength) {
    const candidates = words.filter(w => w.len <= targetLength - length);
    if (candidates.length === 0) break;
    const choice = candidates[Math.floor(Math.random() * candidates.length)];
    lineWords.push(choice.word);
    length += choice.len;
  }
  return lineWords.join("");
}

function generateHaiku() {
  const line1 = generateLine(5);
  const line2 = generateLine(7);
  const line3 = generateLine(5);
  return `${line1}\n${line2}\n${line3}`;
}

function generateTanka() {
  const line1 = generateLine(5);
  const line2 = generateLine(7);
  const line3 = generateLine(5);
  const line4 = generateLine(7);
  const line5 = generateLine(7);
  return `${line1}\n${line2}\n${line3}\n${line4}\n${line5}`;
}

// execute関数はファイル内でexportする
export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();

  let text = '';
  if (sub === 'haiku') {
    text = generateHaiku();
  } else if (sub === 'tanka') {
    text = generateTanka();
  } else {
    await interaction.reply('無効なサブコマンドです');
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle(sub === 'haiku' ? '生成された俳句' : '生成された短歌')
    .setDescription(text)
    .setColor(0x0099FF);

  await interaction.reply({ embeds: [embed] });
}
