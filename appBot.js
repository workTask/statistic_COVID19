require('dotenv').config();

const { Telegraf } = require('telegraf')
 
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Цей  ЧАТ надає оновлені дані про випадки коронавірусу в режимі реального часу зі сторінки світових метрів та інших важливих веб-сайтів, що надаються найвідомішими організаціями та статистичними управліннями у світі.'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()