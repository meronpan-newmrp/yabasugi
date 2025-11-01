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
    GatewayIntentBits.GuildVoiceStates,
  ],
});

export async function execute(interaction){
        const channel = await client.channels.fetch(interaction.options.getString('id'));
        if (channel && channel.isTextBased()) {
            await channel.send(interaction.options.getString('text')); //idにtextを送信
        } else {
            await interaction.reply('指定したチャンネルが見つからないか、テキストチャンネルではありません');
        }
    }
});

client.login(process.env.TOKEN);
