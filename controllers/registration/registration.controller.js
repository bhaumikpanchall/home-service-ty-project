const { Registration, City } = require("../../models");

const registrationUser = async (req, res) => {
  try {
    const {
      Fname,
      Lname,
      City_id,
      Address,
      Mobile_no,
      Email_id,
      Password,
      UserType,
    } = req.body;
    let user;
    if (UserType == "User") {
      user = 1;
    } else if (UserType == "ServiceMan") {
      user = 2;
    }
    // req.file.path = public\uploads\img_1672077447983.jpg
    // let finalPath = uploads\img_1672077447983.jpg
    console.log({
      Fname,
      Lname,
      City_id,
      Address,
      Mobile_no,
      Email_id,
      Password,
      path: req.file.path,
      UserType: user,
    });
    await Registration.create({
      Fname,
      Lname,
      City_id,
      Address,
      Mobile_no,
      Email_id,
      Password,
      Profile_image: req.file.path,
      UserType: user,
    });
    req.flash("response", "Registration Successfull");
    res.redirect("/login");
  } catch (e) {
    console.log("error :", e);
  }

  /*  try {
    console.log("body : ", req.bod);
    const data = await Registration.create(req.body);
    // id = parseInt(req.body.cat_id)
    // req.flash("response", "Data Added Successfully");
    // res.redirect("/admin/city/viewcity");
    console.log({ data });
    res.send({ data });
  } catch (e) {
    console.log("error :", e);
  } */
};

const viewUsers = async (req, res) => {
  try {
    const data = await Registration.findAll({
      where: {
        UserType: 1,
      },
      include: [{ model: City, as: "City" }],
    });
    res.render("admin/user", { data });
  } catch (e) {
    console.log("error :", e);
  }
};

const viewServiceman = async (req, res) => {
  try {
    const data = await Registration.findAll({
      where: {
        UserType: 2,
      },
      include: [{ model: City, as: "City" }],
    });
    res.render("admin/serviceman", { data });
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = { registrationUser, viewUsers, viewServiceman };
