import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

// ロールの色変更を管理するためのグローバル変数
let intervalId = null;

export const data = new SlashCommandBuilder()
  .setName("rainbow")
  .setDescription("指定したロールの色を虹色に変更するよ～")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("start")
      .setDescription("ロールの色を虹色に変更するよ～")
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("色を変更したいロール")
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("interval")
          .setDescription("色変更の間隔（秒単位）")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("stop")
      .setDescription("ロールの色変更を停止するよ～")
  );

export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === "start") {
    const role = interaction.options.getRole("role");
    const interval = interaction.options.getInteger("interval") * 1000;

    if (!interaction.member.permissions.has("MANAGE_ROLES")) {
      await interaction.reply("ロールを管理する権限が必要です。");
      return;
    }

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
      try {
        await role.setColor(colors[index]);
        index = (index + 1) % colors.length;
      } catch (error) {
        console.error("ロールの色を変更できませんでした:", error);
      }
    };

    // インターバルを開始
    intervalId = setInterval(changeColor, interval);

    await interaction.reply({
      content: `${role.name} の色を ${interval / 1000} 秒ごとに虹色に変更中...`,
    });
  } else if (subcommand === "stop") {
    // インターバルを停止
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      await interaction.reply("ロールの色変更を停止しました。");
    } else {
      await interaction.reply("現在、色変更は実行されていません。");
    }
  }
}