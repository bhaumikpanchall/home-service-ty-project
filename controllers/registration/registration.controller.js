const { registrationTemplate } = require("../../helpers/emailTemplates");
const { sendMail } = require("../../helpers/sendMail");
const { Registration, City } = require("../../models");

const renderRegistration = async (req, res) => {
  try {
    const data = await City.findAll({
      where: {
        isActive: 1,
      },
    });
    return res.render("register", { data });
  } catch (e) {
    console.log("error :", e);
  }
};

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
    // sendMail(Email_id, "Registration Successfull", registrationTemplate);
    req.flash("success", "Registration Successfull");
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

const myProfileDetails = async (req, res) => {
  try {
    const data = await Registration.findOne({
      where: {
        id: req.user.id
      },
      include: [{ model: City, as: "City" }],
    });

    res.render("myprofile", { data });
  } catch (e) {
    console.log("error :", e);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userData = await Registration.findOne({
      where: {
        id: req.user.id
      },
    });

    if (userData.Password !== oldPassword) {
      req.flash("response", "Old Password is wrong");
      return res.redirect("/changepassword");
    }

    if (newPassword !== confirmPassword) {
      req.flash("response", "New Password and Confirm Password are not same");
      return res.redirect("/changepassword");
    }

    await Registration.update({ Password: newPassword }, { where: { id: req.user.id } });

    req.flash("response", "New Password set successfully");
    return res.redirect("/profile");
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = {
  renderRegistration,
  registrationUser,
  viewUsers,
  viewServiceman,
  myProfileDetails,
  changePassword,
};
