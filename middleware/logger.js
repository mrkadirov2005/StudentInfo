const Logger=require("../Schemas/Log")

 const  LogEvents= async(type,client,data,trial_status)=>{
const now=new Date()
    const newLog=new Logger({
        type,
        client,
        data,
        date:`year: ${now.getFullYear()} time: ${ now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
        trial_status
    })

    const response=await newLog.save()
    return (await response)
 }
 module.exports=LogEvents