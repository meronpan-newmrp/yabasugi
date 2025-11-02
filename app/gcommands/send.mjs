import { SlashCommandBuilder, Client, GatewayIntentBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('send')
  .setDescription('チャンネルに送信')
  .addStringOption(option =>
    option
      .setName('id')
      .setDescription('チャンネルID')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('text')
      .setDescription('送る内容')
      .setRequired(true)
  );

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export async function execute(interaction) {
  // 3秒ルールを守るために最初にdeferReplyで「考え中」を出す
  await interaction.deferReply({ ephemeral: true });

  const channelId = interaction.options.getString('id');
  const messageText = interaction.options.getString('text');

  try {
    const channel = await client.channels.fetch(channelId);

    if (channel && channel.isTextBased()) {
      await channel.send(messageText);
      // 処理完了後に応答を編集して通知
      await interaction.editReply('メッセージを送信しました');
    } else {
      await interaction.editReply('指定したチャンネルが見つからないか、テキストチャンネルではありません');
    }
  } catch (error) {
    console.error(error);
    await interaction.editReply('エラーが発生しました');
  }
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'send') {
    try {
      await execute(interaction);
    } catch (error) {
      console.error(error);
      if (!interaction.replied) {
        await interaction.reply({ content: '処理中にエラーが発生しました', ephemeral: true });
      }
    }
  }
});

client.login(process.env.TOKEN);
