import { SlashCommandBuilder, Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';

// コマンドデータ定義
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

// 単語リスト（例を簡略化）
const words = [
  { word: "やば", len: 2 },
  { word: "そ", len: 1 },
  { word: "すぎ", len: 3 },
  { word: "そう", len: 2 },
  { word: "ちゃ", len: 1 },
  { word: "ちゃん", len: 2 },
];

// 単語から指定長さの文字列を生成
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

// 俳句生成関数
function yomu() {
  const line1 = generateLine(5);
  const line2 = generateLine(7);
  const line3 = generateLine(5);
  return `${line1}\n${line2}\n${line3}`;
}

// 短歌生成関数
function tyomu() {
  const line1 = generateLine(5);
  const line2 = generateLine(7);
  const line3 = generateLine(5);
  const line4 = generateLine(7);
  const line5 = generateLine(7);
  return `${line1}\n${line2}\n${line3}\n${line4}\n${line5}`;
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// コマンド実行処理
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'yomu') {
    let text = "";
    const sub = interaction.options.getSubcommand();

    if (sub === 'haiku') {
      text = yomu();
    } else if (sub === 'tanka') {
      text = tyomu();
    } else {
      await interaction.reply('無効なサブコマンドです');
      return;
    }

    // 埋め込みメッセージ作成
    const embed = new EmbedBuilder()
      .setTitle(sub === 'haiku' ? '生成された俳句' : '生成された短歌')
      .setDescription(text)
      .setColor(0x0099FF);

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
