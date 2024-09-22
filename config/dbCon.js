const mongoose=require("mongoose")
const CONNECTION_URL="mongodb+srv://muzaffar:ifromurgut2005@cluster0.v2gresd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log(CONNECTION_URL)
const connectDB=async()=>{
    try {
        await mongoose.connect(CONNECTION_URL);
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB