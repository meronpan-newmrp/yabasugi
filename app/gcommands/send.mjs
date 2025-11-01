import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('send')
  .setDescription('チャンネルに送信')
  .addStringOption(option =>
    option
      .setName('ID')
      .setDescription('チャンネルID')
      .setRequired(true)
  );
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
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once('ready', async () => {
    try {
        const channel = await client.channels.fetch(process.argv[2]);
        if (channel && channel.isTextBased()) {
            await channel.send(process.argv[3]); //引数1(ID)に引数2を送信
        } else {
            console.error('指定したチャンネルが見つからないか、テキストチャンネルではありません');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
});

client.login(process.env.TOKEN);
