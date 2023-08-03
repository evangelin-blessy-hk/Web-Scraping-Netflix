const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const port = process.env.PORT || 3500
const url = 'https://www.netflix.com/in/browse/genre/34399'

let movies = []
const fetchData = async () => {
    try{
        let response = await axios.get(url)
        let $ = await cheerio.load(response.data)
        let listItems = $("section.nm-collections-row li.nm-content-horizontal-row-item")
        // console.log(listItems)
        listItems.each( (index, element) => {
            const movie = {name:"", imageUrl:"", linkUrl:""}
            movie.name = $(element).find(".nm-collections-title-name").text()
            movie.imageUrl = $(element).find(".nm-collections-title-img").attr("src")
            movie.linkUrl = $(element).find(".nm-collections-link").attr("href")
            movies.push(movie)
        })

    } catch (err) {
        console.log(err)
    }
}

fetchData()

app.get("/movies", (req, res) => {
    res.send(movies)
})

app.listen(port, () => console.log(`Server running on port ${port}.`))