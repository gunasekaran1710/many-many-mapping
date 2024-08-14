const Student=require('../schema/studentSchema');
const Course=require('../schema/courseSchema');
async function createstudent1(data){
    //check the student name already exist
    const student=data.studentname;
    const studentid=await Student.findOne({studentname:student});
    if (studentid){
        const course=data.coursename;
        const courseid=await Course.findOne({coursename:course});
        if(courseid){
            //chech whether the same student have same course
            const document=await Student.find({"_id":studentid._id,"coursename":{$in:[courseid._id]}});
            console.log(document);
            if (document.length>0){
                const hello="student and his courses already saved on database";
                return [courseid._id,studentid._id];
            }
            else{
                const update3=await Student.updateMany({studentname:data.studentname},{$push:{"coursename":courseid._id}});
                const update4=await Course.updateMany({coursename:data.coursename},{$push:{"studentname":studentid._id}});
                const hello="student details are updated successfully";
                return [courseid._id,studentid._id];
            }

        }
        else{
           //update course name on course module
           const cou2=new Course({"coursename":data.coursename});
           const cou3=await cou2.save({"coursename":data.coursename});
           const update=await Student.updateMany({studentname:data.studentname},{$push:{"coursename":cou3._id}});
           //update course name on student module
           const update1=await Course.updateMany({coursename:data.coursename}, {$push: {"studentname":studentid._id }});
           const hello1="student name already exist,course updated successfully"
           return [cou2._id,studentid._id];


        }
        

    }
    else{
        //check the course already exist
        const course=data.coursename;
        const courseid=await Course.findOne({coursename:course});
        //if course already exist
        if (courseid){
            console.log("course already exist");
            const student2=new Student({"studentname":data.studentname});
            console.log(student2);
            const student3=await student2.save();
            const update=await Student.updateMany({studentname:data.studentname},{$push:{"coursename":courseid._id}});

            //update course
            const update1=await Course.updateMany({coursename:data.coursename}, {$push: {"studentname":student3._id }});
            return [courseid._id,student3._id];



        }
        else{
            console.log('no course');
            //create course
            const cou2=new Course({"coursename":data.coursename});
            const cou3=await cou2.save({"coursename":data.coursename});
            //save student data
            const sstu=new Student({"studentname":data.studentname});
            const sstu3=await sstu.save();
            console.log(sstu3);
            const update=await Student.updateMany({studentname:data.studentname},{$push:{"coursename":cou3._id}});
            //update course
            const update1=await Course.updateMany({coursename:data.coursename}, {$push: {"studentname":sstu3._id }});
            return [cou3._id,sstu3._id];
        }
    }    
}

async function viewstudent1(data){
    const sid={_id:data._id};
    console.log(sid);
    const stu1=await Course.findById({_id:data._id}).populate('studentname');
    console.log(stu1);
    return stu1;
}
async function viewcourse1(data){
    const cid={_id:data._id};
    console.log(cid);
    const cou1=await Student.findById({_id:data._id}).populate('coursename');
    console.log(cou1);
    return cou1;
}
module.exports={createstudent1,viewstudent1,viewcourse1};