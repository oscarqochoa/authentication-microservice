import mongoose from "mongoose";

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const db = process.env.DB_DATABASE

mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0.rqdwn.mongodb.net/?retryWrites=true&w=majority', {
    dbName: db
})
    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err))
