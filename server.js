// express-framework used to create API
const path=require('path')
const express = require('express');
// app is called variable of express
const app = express();
// node package manager--NPM
// mongoose is tool used to connect server with database 
const mongoose = require('mongoose');
// call connection file
const connectDB = require('./config/dbCon');
// import credential middleware
const credentials = require('./middleware/credentials');
// import add student route 
const add_student_route=require("./routes/add_student")
// import add teacher route
const add_teacher_route=require("./routes/add_teacher_route")
// import add group route
const add_group_route=require("./routes/add_group")
// import get teachers route
const get_teachers_route=require("./routes/get_teachers")
// import get students_route
const get_students_route=require("./routes/get_students")
// import get groups_route
const get_groups_route=require("./routes/get_groups")
// import LogEvents from './middleware/logger'; to notify unregistered logins
const LogEvents=require("./middleware/logger")
// import update group route
const get_admin_reports_route=require("./routes/get_reports")
const get_dashboard_route=require("./routes/get_dashboard")
// import get delete handling route
const get_delete_handler_route=require("./routes/delete_route")
// import get update handling route
const get_edit_handler_route=require("./routes/edit_route")
// connect to mongoDB
connectDB();

// Use credentials middleware
app.use(credentials);

const PORT = 7000;

const cors = require('cors');

app.use(cors()); // Allow all origins



app.use('/', express.static(path.join(__dirname, 'assets')));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));



// built-in middleware for json 
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'assets', 'welcome.html'));
    
});
app.post('/add_student',add_student_route)
app.post('/add_teacher',add_teacher_route)
app.post('/add_group',add_group_route)
app.get('/get_teachers',get_teachers_route)
app.get('/get_students',get_students_route)
app.get('/get_groups',get_groups_route)
app.get('/get_admin_reports',get_admin_reports_route)
app.get('/get_dashboard_data',get_dashboard_route)
app.post('/delete',get_delete_handler_route)
app.post('/edit',get_edit_handler_route)

app.get("*",async (req,res)=>{
    LogEvents("unregistered route accessing trial",`${req.originalUrl}`,"access trial to undefined route","unsuccessful")
    res.status(400).json({"got this":req.originalUrl})
})

// Start the server
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
