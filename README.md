# News API Project

I have built an API for the purpose of accessing application data programmatically. The intention is to mimic the building of a real world backend service (such as reddit) which will provide information to the front end architecture.


# Link to hosted version

https://cf-nc-news.herokuapp.com/

## Developer Information

As well as being hosted on heroku this project can be found on my github page claire-farrow where this can be cloned from.

The database is PSQL, and interacts with it using node-postgres. There is a seed file within this project to run the databases which can be done via npm seed for development and testing, or npm seed: prod for production.

dotenv is required to link the databases through a separate environment.

Dependencies are:
- express
- pg
- jest (dev dependency)
- jest sorted (dev dependency)
- supertest (dev dependency)
- dotenv (dev dependency)

Installation instruction:
- npm install
- npm setup-dbs
- npm seed
- npm seed:prod
- npm test
- npm start

# Minimum versions
- Node.js 16.14.0
- Postgresql - 14.1

