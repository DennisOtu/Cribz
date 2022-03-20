import app from './server.js' 
import mongodb from 'mongodb'
import dotenv from 'dotenv' 
import ListingsDAO from './dao/listingsDao.js'

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DB_URI, {
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ListingsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Server started. Listening on port ${port}`)
    })
})
