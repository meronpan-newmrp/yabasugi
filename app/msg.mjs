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
    console.log('やば');

    const channel = client.channels.cache.get(process.env.GCADM_ID); // チャンネルIDを指定
    if (!channel) {
        console.log('指定したチャンネルが見つかりません。');
        return;
    }
    if (!channel.isTextBased()) {
        console.log('指定したチャンネルはテキストチャンネルではありません。');
        return;
    }

    // 最新のメッセージを50件取得
    const messages = await channel.messages.fetch({ limit: 100 ,before: 1387081734734086246});
    const messageArray = Array.from(messages.values()); // Mapを配列に変換
    const filteredMessages = messageArray.slice(0, 100); // 0個前から100個前の範囲を取得

    if (filteredMessages.length === 0) {
        console.log('指定した範囲にメッセージがありません。');
        return;
    }

    // 表示順を逆にする
    filteredMessages.reverse().forEach(message => {
        const sender = message.author.tag.padEnd(20); // 送信者名を20文字で揃える
        const date = message.createdAt.toLocaleString('ja-JP', {
            hour12: false, // 24時間表記
          timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).padEnd(25); // 送信日時を25文字で揃える
      const attachments = message.attachments.map(attachment => attachment.url).join(', ');
      let content = message.content;
        
        // 埋め込みメッセージの内容を追加
        if (message.embeds.length > 0) {
            const embed = message.embeds[0];
            content += `\n[${embed.title || 'なし'},${embed.description || 'なし'}]`;
            if (embed.fields.length > 0) {
                content += `, フィールド: ${embed.fields.map(field => `${field.name}: ${field.value}`).join(', ')}`;
            }
        }
        
      
        console.log(`${date}${sender}${content}  ${attachments || ''}`);
      
      
    });
  console.log(messages.last().id)
  await process.exit()
});


client.login(process.env.TOKEN);