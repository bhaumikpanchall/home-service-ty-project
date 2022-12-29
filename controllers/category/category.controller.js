const { Category } = require("../../models");

const addCategory = async (req, res) => {
  try {
    const { category, description } = req.body;
    const categoryData = await Category.findOne({
      where: { category },
    });

    // req.file.path = public\uploads\img_1672077447983.jpg
    // let finalPath = uploads\img_1672077447983.jpg

    if (categoryData) {
      // req.flash('response', errorResponse(req, res, 'Category already exist'));
      return res.redirect(`admin/category/addservice`);
    }
    console.log({ category, description, path: req.file.path });
    await Category.create({ category, description, cat_image: req.file.path });
    res.redirect("/admin/category/viewservice");
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
    return res.render("admin/viewservice", { data: data });
  } catch (e) {
    console.log("error :", e);
  }
};

const edit = async (req, res) => {
  try {
    const category1 = await Category.findOne({
      where: { id: req.params.id },
    });

    if (!category1) {
      // req.flash('response', errorResponse(req, res, 'Category does not exist'));
      return res.redirect("/admin/viewservice/");
    }

    return res.render("admin/updateservice", {
      editData: category1.dataValues,
    });
  } catch (error) {
    // req.flash('response', errorResponse(req, res, error.message));
    return res.redirect("/admin/category/viewservice");
  }
};

const editCategory = async (req, res) => {
  const { category, description } = req.body;
  let { id } = req.body;
  id = parseInt(id);

  if (category === "" || description === "") {
    // req.flash('response', errorResponse(req, res, 'Enter all details'));
    return res.redirect(`/admin/category/edit/${id}`);
  }
  try {
    const categoryData = await Category.findOne({
      where: { category },
    });

    if (categoryData && id !== categoryData.dataValues.id) {
      // req.flash('response', errorResponse(req, res, 'Category already exist'));
      return res.redirect(`/admin/category/edit/${id}`);
    }

    const payload = {
      category,
      description,
    };

    try {
      await Category.update(payload, { where: { id } });
      // req.flash('response', successResponse(req, res, 'Data Updated Successfully'));
      return res.redirect("/admin/category/viewservice");
    } catch (error) {
      // req.flash('response', errorResponse(req, res, error.message));
      console.log({ error });
      return res.redirect(`/admin/category/edit/${id}`);
    }
  } catch (error) {
    //req.flash('response', errorResponse(req, res, error.message));
    console.log({ error });
    return res.redirect(`/admin/category/edit/${id}`);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      //req.flash("response", errorResponse(req, res, "Category does not exist"));
      return res.redirect("/viewservice/");
    }

    const deleteCategory = await Category.update(
      { isActive: 2 },
      { where: { id } }
    );
    // const deletedCat = await Category.destroy({ where: { id } });
    if (deleteCategory) {
      // req.flash(
      //   "response",
      //   successResponse(req, res, "Data Deleted Successfully")
      // );
      return res.redirect("/viewservice/");
    }
    // req.flash(
    //   "response",
    //   errorResponse(req, res, "Error occured in delete data")
    // );
    return res.redirect("/viewservice/");
  } catch (error) {
    // req.flash("response", errorResponse(req, res, error.message));
    return res.redirect("/viewservice/");
  }
};

module.exports = {
  addCategory,
  viewCategory,
  edit,
  editCategory,
  deleteCategory,
};

// sequealize
// file upload in node js => multer

// middleware
// express-validator validation
// npm i connect-flash
// jsonwebtoken
// npm i nodemailer
//  pagination
