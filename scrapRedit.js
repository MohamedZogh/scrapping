const axios = require('axios');
const cheerio = require('cheerio');

const redditBasePath = 'https://old.reddit.com/'
// #siteTable>.thing>.entry p.title>a.title.text()
axios(redditBasePath)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = []

        $('#siteTable>.thing').each((i, el) => {
            const title = $(el).find('.entry p.title>a.title')
            const time = $(el).find('.entry p.tagline>time')
            let link
            if (title.attr('href') != null) {
                title.attr('href').startsWith('/r/') ? link = redditBasePath + title.attr('href').substring(1) : link = title.attr('href');
            }
            else{
                link = undefined
            }
            const obj = {
                title: title.text(),
                link: link,
                date: time.attr('datetime'),
                // source: time.prev().text()
            }

            articles.push(obj)
        })

        console.log(articles);
    })
    .catch(console.error);