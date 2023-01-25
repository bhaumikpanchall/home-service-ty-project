const { Contact_us } = require("../../models");

const addContact = async (req, res) => {
  try {
    const { Name, Email, Subject, Mobile_no, Message } = req.body;
    console.log({ Name, Email, Subject, Mobile_no, Message });
    await Contact_us.create({ Name, Email, Subject, Mobile_no, Message });
    req.flash("response", "Data Added Successfully");
    res.redirect("/");
  } catch (e) {
    console.log("error :", e);
  }
};

const viewContact = async (req, res) => {
  try {
    const data = await Contact_us.findAll({
      where: {
        isActive: 1,
      },
    });
    return res.render("admin/viewcontact_us", { data: data });
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = {
  addContact,
  viewContact,
};
