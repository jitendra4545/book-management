const mongoose=require('mongoose')

const InterviewSchema=mongoose.Schema({
    text:String,
    ans:{type:String}
})


const InterviewModel=mongoose.model("Interviewchat",InterviewSchema)


module.exports={
    InterviewModel
}