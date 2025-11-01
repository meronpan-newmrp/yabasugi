import fs from "fs";
import path from "path";
import express from "express";
import { Client, Collection, Events, GatewayIntentBits, ActivityType } from "discord.js";
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
import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

// ロールの色変更を管理するためのグローバル変数
let intervalId = null;

    const role = '1351694042567671860'
    const interval = '10' * 1000;

    // 既存のインターバルをクリア
    if (intervalId) {
      clearInterval(intervalId);
    }

    const colors = [
      "#FF0000", // 赤
      "#FF7F00", // オレンジ
      "#FFFF00", // 黄色
      "#00FF00", // 緑
      "#0000FF", // 青
      "#4B0082", // 藍
      "#8B00FF", // 紫
    ];

    let index = 0;

    const changeColor = async () => {
      
    };

    // インターバルを開始
    intervalId = setInterval(changeColor, interval);


  
client.login(process.env.TOKEN);