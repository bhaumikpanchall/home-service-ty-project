const { sendMail } = require("../../helpers/sendMail");
const { Registration, City, Otp } = require("../../models");
const { MAIL_SUBJECT, MAIL_BODY } = require("../../utils/constants");
const otpGenerator = require('otp-generator');

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
    sendMail(Email_id, MAIL_SUBJECT.REGISTRATION, MAIL_BODY("REGISTRATION"));
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

    sendMail(userData.Email_id, MAIL_SUBJECT.PASSWORD_CHANGE, MAIL_BODY("PASSWORD_CHANGE"));
    req.flash("response", "New Password set successfully");
    return res.redirect("/profile");
  } catch (e) {
    console.log("error :", e);
  }
};

const forgotPasswordEmailcheck = async (req, res) => {
  const { Email_id } = req.body;

  try {
    // Check if user exists
    const user = await Registration.findOne({ where: { Email_id } });

    if (!user) {
      req.flash("response", "User not found");
      return res.redirect("/forgotpassword");
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });

    // Store OTP and expiry time in database
    const now = new Date();
    const expires = new Date(now.getTime() + 10 * 60000); // 10 minutes from now
    await Otp.create({ otp, expires, User_id: user.id });

    sendMail(user.Email_id, MAIL_SUBJECT.OTP_FORGOT_PASSWORD, MAIL_BODY("OTP_FORGOT_PASSWORD", { OTP: otp }));

    req.flash("success", "OTP successfully send to your Email address");
    return res.render("checkemail", {
      data: {
        User_id: user.id
      }
    })
  } catch (error) {
    console.log("error :", error);
  }
}

const forgotPasswordOtpcheck = async (req, res) => {
  const { User_id, otp } = req.body;

  try {

    // Check if OTP is valid and has not expired
    const otpRecord = await Otp.findOne({ where: { User_id }, order: [['createdAt', 'DESC']] });
    if (!otpRecord) {
      // req.flash("response", "OTP not found");
      return res.render("checkemail", {
        message: { response: "OTP not found" },
        data: {
          User_id
        }
      });
    }

    const now = new Date();
    if (otpRecord.otp !== otp || otpRecord.expires < now) {
      // req.flash("response", "Invalid OTP");
      return res.render("checkemail", {
        message: { response: "Invalid OTP" },
        data: {
          User_id
        }
      });
    }

    // Remove OTP record from OTP table
    await otpRecord.destroy();

    return res.render("newpassword", {
      data: {
        User_id
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

const generateNewPassword = async (req, res) => {
  try {
    const { User_id, password, confirmPassword } = req.body;
    const userData = await Registration.findOne({
      where: {
        id: User_id
      },
    });

    if (password !== confirmPassword) {
      return res.render("newpassword", {
        message: { response: "New Password and Confirm Password are not same" },
        data: {
          User_id
        }
      });
    }

    await Registration.update({ Password: password }, { where: { id: User_id } });

    sendMail(userData.Email_id, MAIL_SUBJECT.PASSWORD_CHANGE, MAIL_BODY("PASSWORD_CHANGE"));
    req.flash("success", "New Password set successfully");
    return res.redirect("/login");
  } catch (e) {
    console.log("error :", e);
  }
}

module.exports = {
  renderRegistration,
  registrationUser,
  viewUsers,
  viewServiceman,
  myProfileDetails,
  changePassword,
  forgotPasswordEmailcheck,
  forgotPasswordOtpcheck,
  generateNewPassword,
};
