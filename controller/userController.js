const repository=require('../repository/userRepository');
async function createstudent(req,res){
    try{
        const stu=await repository.createstudent1(req.body);
        res.status(201).json(stu);
    }
    catch(err){
        res.status(400).json(error.message);
    }
}

async function viewstudent(req,res){
    try{
        const stu=await repository.viewstudent1(req.body);
        res.status(201).json(stu);

    }
    catch(err){
        res.status(400).json('error');

    }
}
async function viewcourse(req,res){
    try{
        const cou=await repository.viewcourse1(req.body);
        res.status(201).json(cou);
    }
    catch(err){
        res.status(400).json('error');
    }
}
module.exports={createstudent,viewstudent,viewcourse};