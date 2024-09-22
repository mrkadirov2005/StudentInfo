const LogEvents = require("../middleware/logger");
const Pupil = require("../Schemas/Pupil");
const add_student = async (req, res) => {
  try {
    const data = req.body.body;

    // Check if the student already exists
    const isExisting = await Pupil.findOne({
      firstname: data.firstname,
      lastname: data.lastname
    }).exec();

    if (isExisting) {
      // If the student already exists, send a response
      return res.status(409).json({ message: "Student already exists" });
    }

    // If not, create a new student instance
    const newSt = new Pupil({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      address: data.address,
      password: data.password,
      loggedIn: false,
      phone_number: data.phone_number,
      subjects: data.subjects,
      group: data.group,
      rank: 0
    });

    // Save the instance to the database
    const savedStudent = await newSt.save();
LogEvents("add_student","admin_only",`new student with name ${data.firstname} was addedd`,"successful")
    // Send success response
    return res.json({ message: "Student saved successfully" });
  } catch (error) {
    // Handle any error
LogEvents("add_student","admin_only",`new student with name ${data.firstname} was added`,"unsuccessful")

    return res.status(500).json({ error: "Error saving student", details: error.message });
  }
};

module.exports = { add_student };
