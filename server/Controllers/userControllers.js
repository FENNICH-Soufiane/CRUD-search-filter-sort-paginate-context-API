const User = require("../models/userSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");

// register user
exports.createUser = async (req, res) => {
  // console.log(req.file)//ce ligne pour afficher les données de l'image
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, status, location } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !status ||
    !location ||
    !file
  ) {
    return res.status(401).json("All Input are required");
  }

  try {
    const perUser = await User.findOne({ email });
    if (perUser) {
      return res.status(401).json("This user is aleady exist in database");
    } else {
      const dateCreated = moment().format("YYYY-MM-DD HH:mm:ss");

      const newUser = new User({
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
        dateCreated,
      });

      await newUser.save();
      return res
        .status(201)
        .json({ message: "User created successfully.", data: newUser });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user.", error });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  // for pagination
  const page = req.query.page || 1;
  const item_per_page = 4;

  const query = {
    fname: { $regex: search, $options: "i" },
  };
  if (gender && gender != "All") {
    query.gender = gender;
  }

  if (status && status != "All") {
    query.status = status;
  }
  console.log(req.query);
  // console.log(query.gender)
  // console.log(query.status)

  try {
    // const userData = await User.find(query).sort({ dateCreated: -1 }); ce code pour afficher le derenier enregistrement en premier
    const skip = (page - 1) * item_per_page
    const count = await User.countDocuments(query) // nbr of element in data (possibilty to appply filter)
    

    const userData = await User.find(query)
    .sort({dateCreated: sort == "new" ? -1 : 1 })
    .limit(item_per_page)
    .skip(skip);
    
    // pageCount is a number of item into the page
    const pageCount = Math.ceil(count/item_per_page); 


    res.status(200).json({Pagination:{count, pageCount},userData});

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get single user
exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const userById = await User.findById(id);
    const userById = await User.findOne({ _id: id });
    if (!userById) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// edit uesr
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, mobile, gender, status, location, profile } =
    req.body;
  const file = req.file ? req.file.filename : profile;
  const dateUpdate = moment().format("YYYY-MM-DD HH:mm:ss");

  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
        dateUpdate,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // await updateUser.save() //not necessary
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deletedsuccessfully", deleteUser });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

// change status
exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const userstatusupdate = await User.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    res.status(200).json(userstatusupdate);
  } catch (error) {
    res.status(401).json(error);
  }
};

// export user
exports.userExport = async (req, res) => {
  try {
    const usersdata = await User.find();

    const csvStream = csv.format({ headers: true });

    if (!fs.existsSync("public/files/export/")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("public/files/");
      }
      if (!fs.existsSync("public/files/export")) {
        fs.mkdirSync("./public/files/export/");
      }
    }

    const writablestream = fs.createWriteStream(
      "public/files/export/users.csv"
    );

    csvStream.pipe(writablestream);

    writablestream.on("finish", function () {
      res.json({
        downloadUrl: `http://localhost:8080/files/export/users.csv`,
        // downloadUrl: `${BASE_URL}/files/export/users.csv`,
      });
    });
    if (usersdata.length > 0) {
      usersdata.map((user) => {
        csvStream.write({
          FirstName: user.fname ? user.fname : "-",
          LastName: user.lname ? user.lname : "-",
          Email: user.email ? user.email : "-",
          Phone: user.mobile ? user.mobile : "-",
          Gender: user.gender ? user.gender : "-",
          Status: user.status ? user.status : "-",
          Profile: user.profile ? user.profile : "-",
          Location: user.location ? user.location : "-",
          DateCreated: user.datecreated ? user.datecreated : "-",
          DateUpdated: user.dateUpdated ? user.dateUpdated : "-",
        });
      });
    }
    csvStream.end();
    writablestream.end();
  } catch (error) {
    res.status(401).json(error);
  }
};
