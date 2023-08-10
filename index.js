const PORT = 8000

const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

const app = express()
const url = 'https://www.news24.com/news24/search?query=cassper+nyovest'


function normalArticle () {

}

function featuredArticles() {

}

axios(url)
    .then((result) => {
        const html = result.data
        const $ = cheerio.load(html)
        const articles = []
        const mostRead = []
        const featured = []

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
        $('.article-item--top-bar').each(function () {
            const title = $(this).find('a').attr('href')
            // const articleUrl = $(this).find('li a').attr('href')

            featured.push({ title })
        })

        // $('.advsearchDiv').each(function() {
        //     const select = $(this).find('select')

        //     articles.push(select)
        // })

        console.log(featured)
        // console.log(articles)
    }).catch((err) => {
        console.log("something went wrong: ", err);
    });

// app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))