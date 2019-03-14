# All the News That's Fit to Scrape

### Jiffy News App


### Overview

In this assignment, I created a web application called `Jiffy News` that lets users view and make comments on the latest news. Using Mongoose and Cheerio, it scrapes news articles from the Israeli news outlet israelnationalnews.com.

I created the app with Express, Mongoose, Cheerio, Axios, and Node. Lastly, I deployed the app to Heroku.

### Functionality

Whenever a user visits the site, the app scrapes stories from the Israeli news outlet israelnationalnews.com and displays them for the user. Each scraped article is saved to the application database. The app scrapes and displays the following information for each article:

 * `Headline` - the title of the article

 * `Link` - a url link to the original article

 * `Image` - an image associated with the article

Users are able to view the article by clicking the `LINK` button.

By clicking the `Notes` button, the article summary is displayed on the right-hand side of the page, and users are then able to make and save note comments and revisit them later. The notes are saved to the database as well and associated with their articles. All stored comments are visible to every user.

