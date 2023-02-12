const { Category, Registration } = require("../../models");

const homePage = async (req, res) => {
  try {
    const data = await Category.findAll({
      where: {
        isActive: 1,
      },
    });
    return res.render("home", { data: data });
  } catch (e) {
    console.log("error :", e);
  }
};

const servicePage = async (req, res) => {
  try {
    const data = await Category.findAll({
      where: {
        isActive: 1,
      },
    });
    return res.render("service", { data: data });
  } catch (e) {
    console.log("error :", e);
  }
};

const bookingPage = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findOne({
      where: { id, isactive: 1 },
    });
    return res.render("booking", { data, userData: req.user });
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = {
  homePage,
  servicePage,
  bookingPage
};