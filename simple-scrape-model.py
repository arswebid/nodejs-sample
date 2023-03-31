const cheerio = require('cheerio');
const axios = require('axios');

async function scrapeWebPage(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('title').text();
    const body = $('body').text();

    console.log('Title:', title);
    console.log('Body:', body);
  } catch (error) {
    console.error(error);
  }
}

scrapeWebPage('https://www.example.com');
