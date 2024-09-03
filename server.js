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

// connect to mongoDB
connectDB();

// Use credentials middleware
app.use(credentials);

const PORT = 7000;



app.use('/', express.static(path.join(__dirname, 'assets')));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));



// built-in middleware for json 
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'assets', 'welcome.html'));
    
});


// Start the server
mongoose.connection.once('open', () => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
