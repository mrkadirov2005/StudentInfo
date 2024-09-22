const Group = require("../Schemas/Group");
const Teachers=require("../Schemas/Teacher")
const Pupil=require("../Schemas/Pupil");
const LogEvents=require("../middleware/logger")
var Reports=require("../Schemas/Log");
const Teacher = require("../Schemas/Teacher");


const add_Group = async (req, res) => {

const data=req.body.body


try {
if(!data.uid || !data.group_data || !data.students_data) return res.sendStatus(406)

const checkIsExist=await Group.findOne({uid:data.uid})


if(!checkIsExist){
const newGRoup=new Group({
    uid:data.uid,
    group_data:data.group_data,
    students_data:data.students_data
})
console.log("pre_saving")
const isSuccessfull= await newGRoup.save()

LogEvents("add group","admin",`added new group id: ${data.uid}`,"successfull")

console.log("added")

return res.sendStatus(200)
}
else{
    return res.sendStatus(409)
}
} catch (error) {
    console.log(error)
LogEvents("add group","admin",`added new group id: ${data.uid}`,"failed")

    return res.sendStatus(400)
}
};

// function to get teachers
const get_teachers_data=async (req,res)=>{
const TeachersFromDB=await Teachers.find()
LogEvents("get_teachers_data","admin","admin accessed teachers list","successful")
return res.json(TeachersFromDB)
}

// function to get students
const get_students_data=async (req,res)=>{
    const PupilsFromDB=await Pupil.find()
LogEvents("get_students_data","admin","admin accessed students list","successful")

    return res.json(PupilsFromDB)
    }

    // function to get groups
const get_groups_data=async (req,res)=>{
    const GroupsFromDB=await Group.find()
    LogEvents("get_groups_data","admin","admin accessed groups list","successful")

    return res.json(GroupsFromDB)
    }





const get_reports=async (req,res)=>{
    const data_from_backend= await Reports.find()
    console.log(data_from_backend)
    return (await res.json(data_from_backend))
    // data_from_backend.students_data
}



const get_dashboard_data=async(req,res)=>{
const Teacher_n=(await Teacher.find()).length
const Groups_n=(await Group.find()).length
const Pupils_n=(await Pupil.find()).length
const reports_n=(await Reports.find())
const five_recent_reports=await {
    "1":reports_n[reports_n.length-5],
    "2":reports_n[reports_n.length-4],
    "3":reports_n[reports_n.length-3],
    "4":reports_n[reports_n.length-2],
    "5":reports_n[reports_n.length-1],
    "6":reports_n[reports_n.length-0],
}
console.log(five_recent_reports)
return res.json({"teachers":Teacher_n,"groups":Groups_n,"pupils":Pupils_n,"reports":reports_n.length,"recent_reports":five_recent_reports})
}

const delete_stuff=async (req,res)=>{
// delete whole group

const {UID,type,comment}=req.body.body
console.log(UID,type,comment)
if(!UID || !type){
    return res.json(409)
}

if(type==="group"){

    const delete_group=async(req,res)=>{
        try {
                await Group.deleteOne({uid:UID})
            LogEvents("delete_group","admin",comment,"successfull")
            return res.sendStatus(200)
            } catch (error) {
                LogEvents("delete_group","admin",comment,`${error}`)
                return res.sendStatus(400)
            
                
            }
            }

            delete_group()
}else if(type==="teacher"){
    // delete teacher
    const delete_teacher=async()=>{
        
        try {
        const data=await    Teacher.deleteOne({email:UID})
        console.log(data)
        console.log("it is in the try block")
        LogEvents("delete_teacher","admin",comment,"successfull")
        console.log("it is in the try block after log")
        return res.sendStatus(200)
        } catch (error) {
            LogEvents("delete_teacher","admin",comment,`${error}`)
            console.log("did not work")
        }
        }
        delete_teacher()
}


}


const edit_stuff = async (req, res) => {
    console.log(req.body)
    try {
        const { type, UID, prop,current,updated } = req.body.body;
    
        // Validate input
        if (!type || !UID) {
            return res.status(400).json({ message: "Invalid input data" });
        }


        if (type === "teacher") {
            console.log("Accessed teacher board");

            

            // Use bracket notation to update dynamic property
            const updateQuery = { [prop]: current };
            const updateData = { [prop]: updated };
            console.log(updateData,updateQuery,type,UID )
            const edit_teacher_info = await Teacher.updateOne(updateQuery, updateData);

            if (edit_teacher_info.modifiedCount === 0) {
                return res.status(404).json({ message: "Teacher not found or data not updated" });
            }

            return res.status(200).json({ message: "Teacher information updated successfully" });
        } else if(type=="group"){
            console.log("accessed the group edit from")
            const foundData=await Group.findOne({uid:UID}).exec()

            res.json(foundData)
            console.log("request came")
        }
    } catch (error) {
        console.error("Error updating teacher information:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { add_Group,get_teachers_data,get_students_data,get_groups_data,get_reports,get_dashboard_data,delete_stuff,edit_stuff};
