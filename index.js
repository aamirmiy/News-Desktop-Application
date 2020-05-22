const NewsAPI = require('newsapi')
const $=require('jquery')
const newsapi = new NewsAPI('62e354b5416043038d7fb23d828de728')
let navitem = $(".nav-group-item")
let articles = null

getnews('business')

function getnews(category){
newsapi.v2.topHeadlines({
    category:category,
    language:'en',
    country:'us'
}).then((results)=>{
    console.log(results.articles)
    articles = results.articles
    showNews(results.articles)
}).catch((err)=>{
    console.log(err)
})
}

function showNews(allNews){
    $('#news-list').html('')
    $('#news-list').append(`
    <li class="list-group-header">
        <input class="form-control" type="text" value="" placeholder="Search for news" onchange=search(this)>
    </li>
    `)
    allNews.forEach(news => {
        let singleNews=`
    <li class="list-group-item">
        <img class="img-circle media-object pull-left" src="${news.urlToImage}" width="50"
            height="50">
        <div class="media-body">
            <strong><a href="${news.url}" onclick="openarticle(event)" >${news.title}</a></strong>
            <div>
                <span class="">${news.publishedAt}</span>
                <span class="pull-right">Author: ${news.author}</span>
            </div>
            <p>${news.description}</p>
        </div>
    </li>
    `
    $('#news-list').append(singleNews)
    })
}

function openarticle(event){
    event.preventDefault()
    let link =event.target.href
    window.open(link)
}
navitem.click((event)=>{
    let category =event.target.id
    navitem.removeClass('active')
    $(event.target).addClass('active')
    getnews(category)
})

function search(input){
    let query=$(input).val()
    let sortedarticles=articles.filter((item)=>item.title.toLowerCase().includes(query.toLowerCase()))
    showNews(sortedarticles)
}