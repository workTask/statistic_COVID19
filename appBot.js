require('dotenv').config();

const { Telegraf } = require('telegraf');
const api = require('covid19-api');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

 
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.replyWithHTML(
    `Привіт ${ctx.message.from.first_name}!
     Цей  ЧАТ надає оновлені дані про випадки коронавірусу в режимі реального часу зі сторінки світових метрів та інших важливих веб-сайтів, що надаються найвідомішими організаціями та статистичними управліннями у світі.
     `,
     Markup.keyboard([
             ['<i>Ukraine</i>','Hungary'], 
             ['Slovakia', 'Moldova'],
             ['Poland','Belarus']
         ])
         .resize()
         .extra()
     ));
bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on('text', async (ctx) => {
    let info = {};
    try {
        info = await api.getReportsByCountries(ctx.message.text);
        const formatInfo = `
                            Країна: ${info[0][0].country}
                            Випадки: ${info[0][0].cases}
                            Смертей: ${info[0][0].deaths}
                            Вилікувались: ${info[0][0].recovered}
                            `
        ctx.reply(formatInfo);
    } catch (error) {
        ctx.reply('Преревірте правильність введення країни!');
    }
}); 

bot.hears('Привіт!', (ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name}!`));
bot.launch();