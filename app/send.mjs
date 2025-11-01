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
