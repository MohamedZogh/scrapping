const axios = require('axios');
const cheerio = require('cheerio');

const gNewsBasePath = 'https://news.google.com/'
const url = `${gNewsBasePath}topstories?hl=fr&gl=FR&ceid=FR:fr`;

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = []

        $('article').each((i, el) => {
            const title = $(el).find('h3>a,h4>a')
            const time = $(el).find('time')

            const obj = {
                title: title.text(),
                link: title.attr('href') != null ? title.attr('href').replace(/^.\//, gNewsBasePath) : undefined,
                date: time.attr('datetime'),
                source: time.prev().text()
            }

            articles.push(obj)
        })

        console.log(articles);
    })
    .catch(console.error);