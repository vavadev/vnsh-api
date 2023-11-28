const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const url = 'https://www.binance.com/ru/price/bitcoin';

  axios.get(url)
    .then((response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        // Пример: извлечение заголовка страницы
        const pageTitle = $('title').text();

        // Пример: извлечение текста из определенного элемента на странице
        const price = $('div[data-bn-type="text"]')
        const priceTitle = $('h2[data-bn-type="text"]').eq(0).html();
        const priceText = $('div[data-bn-type="text"]').eq(10).html();
        const currentPriceText = $('div[data-bn-type="text"]').eq(13).html();
        const changeText = $('div[data-bn-type="text"]').eq(11).html();
        const dateText = $('div[data-bn-type="text"]').eq(8).html();

        price.each (function() {
            // console.log($(this).html());
        })
        // Создаем объект с данными для отправки в формате JSON
        const data = {
          priceTitle,
          priceText,
          changeText,
          currentPriceText,
          dateText,
        };

        // Отправляем данные в формате JSON как ответ на запрос
        res.json(data);
      } else {
        console.error('Не удалось получить страницу:', response.status);
        res.status(500).send('Произошла ошибка');
      }
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
      res.status(500).send('Произошла ошибка');
    });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});