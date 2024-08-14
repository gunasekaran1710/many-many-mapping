const mongoose=require('mongoose');
const stuSchema=new mongoose.Schema({
    studentname:String,
    coursename:[{type:mongoose. Schema.Types.ObjectId, ref: 'Course' }],
});

const Student=mongoose.model('Student',stuSchema);
module.exports=Student;
