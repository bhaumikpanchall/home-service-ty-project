const {
  Admin, service_provider_details, Category, Registration, City, Booking, Feedback
} = require("../../models");

const addAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    await Admin.create({ username, password });
    res.send("data added");
  } catch (e) {
    console.log("error :", e);
  }
};

const HomePage = async (req, res) => {
  try {
    const userCount = await Registration.count({
      where: {
        Isactive: 1,
        UserType: 1,
      }
    });

    const serviceProviderCount = await Registration.count({
      where: {
        Isactive: 1,
        UserType: 2,
      }
    });

    const categoryCount = await Category.count({
      where: {
        isActive: 1,
      }
    });

    const orderCount = await Booking.count({
      where: {
        isActive: 1,
      }
    });

    return res.render("admin/admin", {
      userCount, serviceProviderCount, categoryCount, orderCount
    })
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = { addAdmin, HomePage };
