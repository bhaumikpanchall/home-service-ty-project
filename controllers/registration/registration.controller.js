const { Registration } = require("../../models");

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
      UserType,
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
      UserType,
    });
    // req.flash("response", "Data Added Successfully");
    res.redirect("/register");
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

/*
const viewUserData = async (req, res) => {
  try {
    const data = await Registration.findAll({
      include: [{ model: City, as: "City" }],
    });
    console.log({ data });
    res.send({ data });
  } catch (e) {
    console.log("error :", e);
  }
}; */

module.exports = { registrationUser };
