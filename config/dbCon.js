const mongoose=require("mongoose")
const CONNECTION_URL="mongodb+srv://githubmuzaffar:abc12345678$@studentinfo.yhug4.mongodb.net/?retryWrites=true&w=majority&appName=StudentInfo"
console.log(CONNECTION_URL)
const connectDB=async()=>{
    try {
        await mongoose.connect(CONNECTION_URL);
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB