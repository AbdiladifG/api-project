const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 9000
require("dotenv").config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rapper-names'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
app.get('/', (request, response) => {
    db.collection('messages').find().sort({'likes': -1}).toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addRapper', (request, response) => {
    db.collection('messages').insertOne(request.body)
        .then(result => {
            console.log('Rapper Added')
            console.log(response.body)
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('messages').findOneAndUpdate({
        name: request.body.name,
        msg: request.body.msg
    }, {
        $set: {
            likes: request.body.likes + 1
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(result => {
            console.log('Added One Like')
            response.json('Like Added')
        })
        .catch(error => console.error(error))
})
app.put('/dislike', (request, response) => {
    console.log(request)
    db.collection('messages').findOneAndUpdate({
        name: request.body.name,
        msg: request.body.msg,
    }, {
        $set: {
            likes: request.body.likes - 1
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(result => {
            console.log('Added One DisLike')
            response.json('DisLike Added')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteRapper', (request, response) => {
    console.log(request.body.name, request.body.msg)
    db.collection('messages').findOneAndDelete({ name: request.body.name, msg: request.body.msg })
        .then(result => {
            console.log('Rapper Deleted')
            response.json('Rapper Deleted')
        })
        .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

