const { Category } = require("../../models");

const addCategory = async (req, res) => {
  try {
    const { category, description } = req.body;
    console.log({ category, description, path: req.file.path });
    await Category.create({ category, description, cat_image: req.file.path });
    res.redirect("/viewservice");
  } catch (e) {
    console.log("error :", e);
  }
};

const viewCategory = async (req, res) => {
  try {
    const data = await Category.findAll({
      where: {
        isActive: 1,
      },
    });
    res.render("admin/viewservice", { data: data });
    // res.json({ data });
  } catch (e) {
    console.log("error :", e);
  }
};

const editCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { category } = req.body;
    const payload = {
      category,
    };
    const data = await Category.update(payload, {
      where: { id },
    });
    res.json({ data, msg: "data updated" });
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = { addCategory, viewCategory, editCategory };

// sequealize
// file upload in node js => multer

// middleware
// express-validator validation
// npm i connect-flash
// jsonwebtoken
// npm i nodemailer
//  pagination
