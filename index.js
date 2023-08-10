const PORT = 8000

const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

const app = express()
const url = 'https://www.news24.com/news24/search?query=cassper+nyovest'
const mainUrl = 'https://www.news24.com/news24'


function normalArticle(url) {
    axios(url)
        .then((result) => {
            const html = result.data
            const $ = cheerio.load(html)
            const articles = []
            const mostRead = []

            $('.article-item--container').each(function () {
                const title = $(this).find('.article-item__title span').text()
                const articleUrl = $(this).find('.article-item--container a').attr('href')
                const imageUrl = $(this).find('.article-item__image img').attr('src')
                const datePublished = $(this).find('.article-item__footer p').text()


                articles.push({ title, articleUrl, imageUrl, datePublished })
            })
            $('.most-read-widget__tab').each(function () {
                const title = $(this).find('.most-read-widget__title').text()
                const articleUrl = $(this).find('li a').attr('href')

                mostRead.push({ title, articleUrl })
            })

            return (articles, mostRead)
            console.log(articles)
        }).catch((err) => {
            console.log("something went wrong: ", err);
        });
}

function featuredArticles() {
    axios(mainUrl).then((result) => {
        const html = result.data
        const $ = cheerio.load(html)

        const featured = []

        $('.featured').each(function () {
            const title = $(this).find('.article-item--container .article-item__title').text()
            const articleUrl = $(this).find('.article-item__title').attr('href')

            featured.push({ title, articleUrl })
        })

        console.log(featured);
        return (featured);

    }).catch((err) => {
        console.log("someething went wrong: ", err);
    });
}

console.log(featuredArticles());

app.listen(PORT, () => console.log(`<----------->exit<---------->`))