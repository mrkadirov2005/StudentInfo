const LogEvents = require("../middleware/logger");
const Teacher = require("../Schemas/Teacher");

const add_teacher = async (req, res) => {
  try {
    const data = req.body.body;
    // if(!data) return res.sendStatus(406)
    // Check if the student already exists
    const isExisting = await Teacher.findOne({
      email:data.email
    }).exec();

    if (isExisting) {
      // If the student already exists, send a response
      LogEvents("add_teacher","VIP only","VIp tried to add"+data.firstname,"unsuccessful")
      return res.sendStatus(409);
    }
    // If not, create a new student instance
    const newT = new Teacher({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      address: data.address,
      password: data.password,
      loggedIn: false,
      phone_number: data.phone_number,
      subject: data.subject,
      groups: data.groups,
      rank: data.rank,
      
    });

    // Save the instance to the database
    const savedTeacher = await newT.save();
    // Send success response
    LogEvents("add_teacher","VIP only","VIp tried to add"+data.firstname,"successful")

    return res.sendStatus(200)
  } catch (error) {
    // Handle any error
    return error;
  }
};

module.exports = { add_teacher };
