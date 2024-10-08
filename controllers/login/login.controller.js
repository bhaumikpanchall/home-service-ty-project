const { Registration, Admin } = require("../../models");
const jwt = require('jsonwebtoken');
const { sendMail } = require("../../helpers/sendMail");
const { loginTemplate } = require("../../helpers/emailTemplates");
const { MAIL_SUBJECT, MAIL_BODY } = require("../../utils/constants");

const userLogin = async (req, res) => {
  try {
    const { Email_id, Password, rememberme } = req.body;
    const user = await Registration.findOne({
      where: { Email_id, Password, isactive: 1 },
    });
    if (user) {
      // const password_valid = await bcrypt.compare(req.body.password,user.password);
      if (
        user.dataValues.Email_id == Email_id &&
        user.dataValues.Password == Password
      ) {
        const userData = { user: user.dataValues };
        const accessToken = jwt.sign(
          userData,
          process.env.ACCESS_TOKEN_SECRET,
        );
        res.cookie('token', accessToken);
        if (rememberme) {
          res.cookie('email', Email_id);
          res.cookie('password', Password);
        }
        sendMail(Email_id, MAIL_SUBJECT.LOGIN, MAIL_BODY("LOGIN"));
        if (user.dataValues.UserType == 1) {
          return res.redirect("/");
        } else if (user.dataValues.UserType == 2) {
          return res.redirect("/serviceprovider");
        }
        // token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
        // res.status(200).json({ token : token });
      } else {
        return res.redirect("/login");
        //res.status(400).json({ error : "Password Incorrect" });
      }
    } else {
      req.flash("response", "Enter valid password.");
      return res.redirect("/login");
      //res.status(404).json({ error : "User does not exist" });
    }
  } catch (e) {
    console.log("error :", e);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password, rememberme } = req.body;
    const user = await Admin.findOne({
      where: { username, password, isactive: 1 },
    });
    if (user) {
      // const password_valid = await bcrypt.compare(req.body.password,user.password);
      if (
        user.dataValues.username == username &&
        user.dataValues.password == password
      ) {
        const payload = {
          ...user.dataValues, UserType: 3
        }
        const userData = { user: payload };
        const accessToken = jwt.sign(
          userData,
          process.env.ACCESS_TOKEN_SECRET,
        );
        res.cookie('token', accessToken);
        if (rememberme) {
          res.cookie('adminemail', username);
          res.cookie('adminpassword', password);
        }
        return res.redirect("/admin");
        // token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
        // res.status(200).json({ token : token });
      } else {
        return res.redirect("/admin/login");
        //res.status(400).json({ error : "Password Incorrect" });
      }
    } else {
      req.flash("response", "Enter valid password.");
      return res.redirect("/admin/login");
      //res.status(404).json({ error : "User does not exist" });
    }
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = { userLogin, adminLogin };
