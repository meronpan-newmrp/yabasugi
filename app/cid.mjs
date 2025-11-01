import fs from "fs";
import path from "path";
import express from "express";
import { Client, Collection, Events, GatewayIntentBits, ActivityType, EmbedBuilder } from "discord.js";
import CommandsRegister from "./regist-commands.mjs";
import Notification from "./models/notification.mjs";
import YoutubeFeeds from "./models/youtubeFeeds.mjs";
import YoutubeNotifications from "./models/youtubeNotifications.mjs";
import Sequelize from "sequelize";
import Parser from 'rss-parser';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.once('ready', async () => {
  

  const guild = client.guilds.cache.get('1268907280636837899'); // サーバーIDを指定
  if (!guild) {
    console.log('指定したサーバーが見つかりませんでした。');
    return;
  }

  const channels = await guild.channels.fetch();
  const channel = channels.find((ch) => ch.name === 'toとbanメモ'); // チャンネル名を指定
  if (channel) {
    console.log(`チャンネルID: ${channel.id}`);
  } else {
    console.log('指定した名前のチャンネルが見つかりませんでした。');
  }
});
client.login(process.env.TOKEN);