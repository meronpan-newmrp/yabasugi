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

// コマンド実行処理
export async function execute(interaction) {
  const channel = await client.channels.fetch(interaction.options.getString('id'));
  if (channel && channel.isTextBased()) {
    await channel.send(interaction.options.getString('text'));
    await interaction.reply({ content: 'メッセージを送信しました', ephemeral: true });
  } else {
    await interaction.reply({ content: '指定したチャンネルが見つからないか、テキストチャンネルではありません', ephemeral: true });
  }
}

// interactionCreateイベントリスナー追加（ここが重要）
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'send') {
    try {
      await execute(interaction);
    } catch (error) {
      console.error(error);
      if (!interaction.replied) {
        await interaction.reply({ content: 'エラーが発生しました', ephemeral: true });
      }
    }
  }
});

client.login(process.env.TOKEN);
