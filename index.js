require("dotenv").config()
const express = require('express')
const { connection } = require("./config/db")
const { BookModel } = require("./model/BooksModel")
const app = express()
app.use(express.json())
// app.get("/", (req, res) => {
//     res.send("Hi this is a book management sysstem ")
// })


//<-----  Here You Can Add New Books ----->

app.post("/", async (req, res) => {
    let data = req.body
    try {
        let newData = new BookModel(data)
        await newData.save()
        res.send({ "msg": "New Book Added Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Add Data","err":err.message })
    }
})



//<-----  Here You Can Get All the Book Details ----->

app.get("/", async (req, res) => {
    try {
        let getAll = await BookModel.find()
        res.send(getAll)
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Get Data","err":err.message })
    }
})


//<-----  Here You Can Get a Single book details by its id ----->

app.get("/:id", async (req, res) => {
    try {

    } catch (err) {

    }
})


//<-----  Here You Can Delete A Specific book by its Id ----->

app.delete("/:id", async (req, res) => {
    try {

    } catch (err) {

    }
})

//<-----  Here You Can Update A Specific book by its Id ----->

app.patch("/:id", async (req, res) => {
    try {

    } catch (err) {

    }
})





app.listen(process.env.port, async (req, res) => {
    try {
        await connection
        console.log("Server Successfully connected to DB")
    } catch (err) {
        console.log("Unable to connect with DB")
    }
    console.log(`Server running on Port ${process.env.port}`)
})

