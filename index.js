require("dotenv").config()
const express = require('express')
const { connection } = require("./config/db")
const app=express()

app.get("/",(req,res)=>{
    res.send("Hi this is a book management sysstem ")
})


app.listen(process.env.port,async(req,res)=>{
    try{
      await connection
      console.log("Server Successfully connected to DB")
    }catch(err){
      console.log("Unable to connect with DB")
    }   
     console.log(`Server running on Port ${process.env.port}`)
})

