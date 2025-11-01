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

const channel = Client.channels.cache.get('チャンネルID');
if (channel) {
    channel.send('送信したいメッセージ');
} else {
    console.error('指定したチャンネルが見つかりません');
}
