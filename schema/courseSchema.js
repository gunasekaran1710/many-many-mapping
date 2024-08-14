const mongoose=require('mongoose');
const coSchema=new mongoose.Schema({
    coursename:String,
    studentname: [{type:mongoose. Schema.Types.ObjectId, ref: 'Student' }],
});

const Course=mongoose.model('Course',coSchema);
module.exports=Course;