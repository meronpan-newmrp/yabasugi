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

client.on('ready', () => {
    const guild = client.guilds.cache.get('1268907280636837899'); // サーバーIDを指定
    const channels = guild.channels.cache;

    channels.forEach(channel => {
        console.log(`チャンネル名: ${channel.name}, タイプ: ${channel.type}`);
    });
});

client.login(process.env.TOKEN);