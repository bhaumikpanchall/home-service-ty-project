const { sendMail } = require("../../helpers/sendMail");
const {
  Category,
  Registration,
  Booking,
  City,
  service_provider_details,
  Feedback,
} = require("../../models");
const { BOOKING_STATUS, PAYMENT_STATUS, PAYMENT_TYPE, MAIL_SUBJECT, MAIL_BODY } = require("../../utils/constants");
const { viewFeedbacksForUsers } = require("../feedback/feedback.controller");

const homePage = async (req, res) => {
  try {
    const data = await Category.findAll({
      where: {
        isActive: 1,
      },
    });

    const feedbacks = await viewFeedbacksForUsers();
    return res.render("home", { data: data, feedbacks });
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

const bookOrder = async (req, res) => {
  const { userId, categoryId, date } = req.body;
  const payload = {
    User_id: userId,
    Category_id: categoryId,
    Booking_date: date,
  }
  try {
    await Booking.create(payload);
    sendMail(req.user.Email_id, MAIL_SUBJECT.ORDER_PLACED, MAIL_BODY("ORDER_PLACED"));
    return res.redirect("/orders")
  } catch (e) {
    console.log("error :", e);
  }
};

const editProfilePage = async (req, res) => {
  try {
    const data = await City.findAll({
      where: {
        isActive: 1,
      },
    });

    const userData = await Registration.findOne({
      where: {
        id: req.user.id
      },
      include: [{ model: City, as: "City" }],
    });
    return res.render("editprofile", { data, userData });
  } catch (e) {
    console.log("error :", e);
  }
}

const editProfile = async (req, res) => {
  const { Fname, Lname, Mobile_no, City_id, Address } = req.body;
  let { id } = req.body;
  id = parseInt(id);

  const payload = {
    Fname, Lname, Mobile_no, City_id, Address
  };

  try {
    await Registration.update(payload, { where: { id } });

    req.flash("response", "Data updated Successfully");
    return res.redirect("/editprofile");
  } catch (e) {
    console.log("error :", e);
  }
}

const myOrders = async (req, res) => {
  const userId = req.user.id;

  try {

    let data = await Booking.findAll({
      where: {
        isActive: 1,
        User_id: userId,
      },
      include: [
        { model: Category, as: "Category_Booking" },
        {
          model: service_provider_details, as: "ServiceProvider", include: [
            { model: Registration, as: "Username" }
          ]
        },
      ],
    });

    data = data.map((item) => {
      return {
        ...item.dataValues,
        Booking_status: BOOKING_STATUS[item.Booking_status],
        Payment_status: PAYMENT_STATUS[item.Payment_status],
        Payment_Type: PAYMENT_TYPE[item.Payment_Type],
      }
    });

    return res.render("mybookings", { data });
  } catch (e) {
    console.log("error :", e);
  }
};

const addFeedback = async (req, res) => {
  const { Booking_id, message } = req.body;

  const payload = {
    User_id: parseInt(req.user.id),
    Booking_id: parseInt(Booking_id),
    message
  };

  try {
    await Feedback.create(payload);

    req.flash("response", "Data added Successfully");
    return res.redirect("/orders");
  } catch (e) {
    console.log("error :", e);
  }
}

const fetchFeedbacks = async (req, res) => {
  const userId = req.user.id;

  try {
    let data = await Feedback.findAll({
      where: {
        isActive: 1,
        User_id: userId,
      },
      include: [
        {
          model: Booking, as: "BookingData", include: [
            { model: Category, as: "Category_Booking" },
            {
              model: service_provider_details, as: "ServiceProvider", include: [
                { model: Registration, as: "Username" }
              ]
            },
          ]
        },
      ],
    });

    return res.render("myfeedbacks", { data });
  } catch (e) {
    console.log("error :", e);
  }
}

module.exports = {
  homePage,
  servicePage,
  bookingPage,
  bookOrder,
  editProfilePage,
  editProfile,
  myOrders,
  addFeedback,
  fetchFeedbacks,
};