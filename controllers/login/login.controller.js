const { Registration } = require("../../models");
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
  try {
    const { Email_id, Password } = req.body;
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

module.exports = { userLogin };
