const { Category } = require("../../models");

const addCategory = async (req, res) => {
  try {
    const { category, description, visiting_charge, charge_perhour} = req.body;
    const category1 = await Category.findOne({
      where: { category },
    });

    if (category1) {
      req.flash("response", "Category already exist");
      return res.redirect("addservice");
    }
    // req.file.path = public\uploads\img_1672077447983.jpg
    // let finalPath = uploads\img_1672077447983.jpg
    console.log({ category, description, path: req.file.path, visiting_charge, charge_perhour});
    await Category.create({ category, description, cat_image: req.file.path, visiting_charge, charge_perhour });
    req.flash("response", "Data Added Successfully");
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
      req.flash("response", "Category does not exist");
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
  const { category, description, visiting_charge, charge_perhour} = req.body;
  let { id } = req.body;
  id = parseInt(id);

  if (category === "" || description === "" || visiting_charge === "" || charge_perhour === "" ) {
    req.flash("response", "Enter all details");
    //req.flash("response", errorResponse(req, res, "Enter all details"));
    return res.redirect(`/admin/category/edit/${id}`);
  }
  try {
    const categoryData = await Category.findOne({
      where: { category },
    });

    if (categoryData && id !== categoryData.dataValues.id) {
      req.flash("response", "Category already exist");
      // req.flash('response', errorResponse(req, res, 'Category already exist'));
      return res.redirect(`/admin/category/edit/${id}`);
    }

    const payload = {
      category,
      description,
      visiting_charge,
      charge_perhour,
    };

    try {
      await Category.update(payload, { where: { id } });
      req.flash("response", "Data Updated Successfully");
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
      req.flash("response", "Category does not exist");
      //req.flash("response", errorResponse(req, res, "Category does not exist"));
      return res.redirect("/admin/category/viewservice/");
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
      req.flash("response", "Data Deleted Successfully");
      return res.redirect("/admin/category/viewservice/");
    }
    // req.flash(
    //   "response",
    //   errorResponse(req, res, "Error occured in delete data")
    // );
    req.flash("response", "Error occured in delete data");
    return res.redirect("/admin/category/viewservice/");
  } catch (error) {
    // req.flash("response", errorResponse(req, res, error.message));
    return res.redirect("/admin/category/viewservice/");
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
