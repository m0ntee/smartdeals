const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3000;
const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: false });
const GROUP_ID = '-1001234567890';
const SECRET_KEY = 'your_secret_key_123';

// Обработчик перехода
app.get('/redirect', (req, res) => {
    if (req.query.key !== SECRET_KEY) {
        return res.status(403).send('Доступ запрещён');
    }

    const userId = req.query.userId;
    
    bot.sendMessage(GROUP_ID, `Пользователь ${userId} перешёл по ссылке!`)
        .then(() => {
            res.redirect('https://telegram.me/ваш_бот'); // Перенаправляем в Телеграм
        })
        .catch((err) => {
            console.error('Ошибка:', err);
            res.status(500).send('Ошибка сервера');
        });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});