//ギルドコマンドを登録する
import { REST, Routes } from 'discord.js';

const token = process.env.TOKEN;
const clientId = process.env.APPLICATION_ID;
const guildId = '1298304487605403658';

import fs from 'node:fs';

const commands = [];
const commandFiles = fs.readdirSync('./gcommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  import command from `./gcommands/${file}`;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
