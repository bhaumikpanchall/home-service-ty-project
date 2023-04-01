const express = require("express");
const { updateOrderDetails } = require("../controllers/order/order.controller");
const router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res) {
//   res.send("respond with a resource");
// });
const {
  addServiceProviderDetails,
  viewServiceProviderDetails,
  deleteServiceProviderDetails,
  fetchServiceProviderDetailsByCategory,
  fetchMyOrders,
  fetchMyOrderById,
  fetchMyOrderByIdForUpdate,
  myProfileDetails,
  editProfilePage,
  editProfile,
  changePassword,
  fetchFeedbacks,
} = require("../controllers/serviceprovider/serviceprovider.controller");
const imageUpload = require("../helpers/imageUpload");

router.get("/myprofile", myProfileDetails);

router.get("/editprofile", editProfilePage);

router.post("/editprofile", editProfile);

router.get("/changepassword", (req, res) => {
  return res.render("serviceprovider/changepassword");
});

router.post("/changepassword", changePassword);

router.get("/feedbacks", fetchFeedbacks);

router.get("/", fetchMyOrders);

router.get("/order/:id", fetchMyOrderById);

router.get("/update/:id", fetchMyOrderByIdForUpdate);

router.post("/update", updateOrderDetails);



// router.get("/delete/:id", deleteServiceProviderDetails);

// router.post(
//   "/add",
//   imageUpload.single("Document_image"),
//   addServiceProviderDetails,
// );

router.post("/add",
  imageUpload.single("Document_image"),
  addServiceProviderDetails);

// router.post("/byCategory", fetchServiceProviderDetailsByCategory);

module.exports = router;
