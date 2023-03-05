const { Booking, Category, Registration, service_provider_details } = require("../../models");
const { BOOKING_STATUS, PAYMENT_STATUS, PAYMENT_TYPE, BOOKING_CODE } = require("../../utils/constants");


const viewOrder = async (req, res) => {
    try {
        let data = await Booking.findAll({
            where: {
                isActive: 1,
            },
            include: [
                { model: Category, as: "Category_Booking" },
                { model: Registration, as: "User" },
                {
                    model: service_provider_details, as: "ServiceProvider", include: [
                        { model: Registration, as: "Username" },
                    ]
                }
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

        return res.render("admin/order", { data: data });
    } catch (e) {
        console.log("error :", e);
    }
};

const assignServiceProvider = async (req, res) => {

    try {
        const { orderId, serviceprovider } = req.body;
        const data = await Booking.findOne({
            where: { id: orderId },
        });
        if (!data) {
            req.flash("response", "Order does not exist");
            return res.redirect("/admin/order");
        }

        const updatedDetails = await Booking.update(
            {
                Service_provider_id: serviceprovider,
                Booking_status: BOOKING_CODE.Confirmed,
            },
            { where: { id: orderId } }
        );

        if (updatedDetails) {
            req.flash("response", "Data updated Successfully");
            return res.redirect("/admin/order");
        }

        return res.redirect("/admin/order");
    } catch (error) {
        console.log(error);
        return res.redirect("/admin/order");
    }
};

const updateOrderDetails = async (req, res) => {

    try {
        const {
            orderId, totalAmount, bookingStatus, paymentStatus
        } = req.body;

        const data = await Booking.findOne({
            where: { id: orderId },
        });
        if (!data) {
            req.flash("response", "Order does not exist");
            return res.redirect(`/serviceprovider/${orderId}`);
        }

        const updatedDetails = await Booking.update(
            {
                Total_Amount: totalAmount,
                Payment_status: paymentStatus,
                Booking_status: bookingStatus,
            },
            { where: { id: orderId } }
        );

        if (updatedDetails) {
            req.flash("response", "Data updated Successfully");
            return res.redirect(`/serviceprovider/${orderId}`);
        }

        return res.redirect(`/serviceprovider/${orderId}`);
    } catch (error) {
        console.log(error);
        return res.redirect(`/serviceprovider/${orderId}`);
    }
};

module.exports = {
    viewOrder,
    assignServiceProvider,
    updateOrderDetails,
};
