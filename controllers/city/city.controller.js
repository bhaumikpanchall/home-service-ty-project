const { City } = require("../../models");

const addCity = async (req, res) => {
  try {
    const { City_name } = req.body;
    const cityData = await City.findOne({
      where: { City_name },
    });

    if (cityData) {
      req.flash("response", "Category already exist");
      return res.redirect("/admin/city/addcity");
    }
    console.log({ City_name });
    await City.create({ City_name });
    req.flash("response", "Data Added Successfully");
    res.redirect("/admin/city/viewcity");
  } catch (e) {
    console.log("error :", e);
  }
};

const viewCity = async (req, res) => {
  try {
    const data = await City.findAll({
      where: {
        isActive: 1,
      },
    });
    return res.render("admin/viewcity", { data: data });
  } catch (e) {
    console.log("error :", e);
  }
};

const edit = async (req, res) => {
  try {
    const city1 = await City.findOne({
      where: { id: req.params.id },
    });

    if (!city1) {
      req.flash("response", "City does not exist");
      // req.flash('response', errorResponse(req, res, 'Category does not exist'));
      return res.redirect("/admin/viewcity/");
    }

    return res.render("admin/updatecity", {
      editData: city1.dataValues,
    });
  } catch (error) {
    // req.flash('response', errorResponse(req, res, error.message));
    return res.redirect("/admin/city/viewcity");
  }
};

const editCity = async (req, res) => {
  const { City_name } = req.body;
  let { id } = req.body;
  id = parseInt(id);

  if (City_name === "") {
    req.flash("response", "Enter details");
    // req.flash('response', errorResponse(req, res, 'Enter all details'));
    return res.redirect(`/admin/city/edit/${id}`);
  }
  try {
    const cityData = await City.findOne({
      where: { City_name },
    });

    if (cityData && id !== cityData.dataValues.id) {
      req.flash("response", "City already exist");
      // req.flash('response', errorResponse(req, res, 'Category already exist'));
      return res.redirect(`/admin/city/edit/${id}`);
    }

    const payload = {
      City_name,
    };

    try {
      await City.update(payload, { where: { id } });
      req.flash("response", "Data Updated Successfully");
      // req.flash('response', successResponse(req, res, 'Data Updated Successfully'));
      return res.redirect("/admin/city/viewcity");
    } catch (error) {
      // req.flash('response', errorResponse(req, res, error.message));
      console.log({ error });
      return res.redirect(`/admin/city/edit/${id}`);
    }
  } catch (error) {
    //req.flash('response', errorResponse(req, res, error.message));
    console.log({ error });
    return res.redirect(`/admin/city/edit/${id}`);
  }
};

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findOne({
      where: { id },
    });

    if (!city) {
      req.flash("response", "City does not exist");
      //req.flash("response", errorResponse(req, res, "Category does not exist"));
      return res.redirect("/admin/city/viewcity/");
    }

    const deleteCity = await City.update({ isActive: 2 }, { where: { id } });
    // const deletedCat = await Category.destroy({ where: { id } });
    if (deleteCity) {
      // req.flash(
      //   "response",
      //   successResponse(req, res, "Data Deleted Successfully")
      // );
      req.flash("response", "Data Deleted Successfully");
      return res.redirect("/admin/city/viewcity/");
    }
    // req.flash(
    //   "response",
    //   errorResponse(req, res, "Error occured in delete data")
    // );
    return res.redirect("/admin/city/viewcity/");
  } catch (error) {
    // req.flash("response", errorResponse(req, res, error.message));
    return res.redirect("/admin/city/viewcity/");
  }
};

module.exports = {
  addCity,
  viewCity,
  edit,
  editCity,
  deleteCity,
};
