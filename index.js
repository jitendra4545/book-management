require("dotenv").config()
const express = require('express')
const cors = require('cors')
const { connection } = require("./config/db")
const { BookModel } = require("./model/BooksModel")
const { InterviewModel } = require("./model/Interview")
const app = express()
app.use(express.json())
app.use(cors())


app.post("/int", async (req, res) => {
    let { text, email } = req.body
    console.log(text, email)
    try {
        let newData = new InterviewModel({ text, email })
        await newData.save()
        res.send({ "msg": "Chat Data added Successfully" })
    } catch (err) {
        req.send({ "msg": "Something went wrong", "err": err.message })
    }
})

app.delete("/int",async(req,res)=>{
    try{
        let Data=await InterviewModel.deleteMany()
        res.send(Data)

    }catch(err){
        req.send({ "msg": "Something went wrong", "err": err.message })
    }
})


app.get("/int", async (req, res) => {
 
    try {
        let Data = await InterviewModel.find()
        res.send(Data)
    } catch (err) {
        req.send({ "msg": "Something went wrong", "err": err.message })
    }
})

//<-----  Here You Can Add New Books ----->

app.post("/", async (req, res) => {
    let data = req.body
    try {
        let newData = new BookModel(data)
        await newData.save()
        res.send({ "msg": "New Book Added Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Add Data", "err": err.message })
    }
})



//<-----  Here You Can Get All the Book Details ----->

app.get("/", async (req, res) => {
    try {
        let getAll = await BookModel.find()
        res.send(getAll)
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Get Data", "err": err.message })
    }
})


//<-----  Here You Can Get a Single book details by its id ----->

app.get("/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        let SingleData = await BookModel.find({ _id: id })
        res.send(SingleData)
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Get Data", "err": err.message })
    }
})


//<-----  Here You Can Delete A Specific book by its Id ----->

app.delete("/:id", async (req, res) => {
    let id = req.params.id
    try {
        await BookModel.findOneAndDelete({ _id: id })
        res.send({ "msg": "Book Data Deleted Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Delete Data", "err": err.message })
    }
})

//<-----  Here You Can Update A Specific book by its Id ----->

app.patch("/:id", async (req, res) => {
    let data = req.body
    let id = req.params.id

    try {
        await BookModel.findOneAndUpdate({ _id: id }, data)
        res.send({ "msg": "Book Data Updated Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Unable to Update Data", "err": err.message })
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

