const { sendMail } = require("../../helpers/sendMail");
const { Booking, Category, Registration, service_provider_details, City } = require("../../models");
const { BOOKING_STATUS, PAYMENT_STATUS, PAYMENT_TYPE, BOOKING_CODE, MAIL_SUBJECT, MAIL_BODY } = require("../../utils/constants");


const viewOrder = async (req, res) => {
    try {
        let data = await Booking.findAll({
            where: {
                isActive: 1,
            },
            include: [
                { model: Category, as: "Category_Booking" },
                {
                    model: Registration, as: "User", include: [
                        { model: City, as: "City" },
                    ]
                },
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
            include: [
                { model: Registration, as: "User" }
            ]
        });
        if (!data) {
            req.flash("response", "Order does not exist");
            return res.redirect("/admin/order");
        }

        const ServiceProviderDetails = await service_provider_details.findOne({
            where: { id: serviceprovider },
            include: [
                { model: Registration, as: "Username" }
            ]
        });

        const updatedDetails = await Booking.update(
            {
                Service_provider_id: parseInt(serviceprovider),
                Booking_status: BOOKING_CODE.Confirmed,
            },
            { where: { id: parseInt(orderId) } }
        );

        if (updatedDetails) {
            // Mail to user
            sendMail(data.User.Email_id, MAIL_SUBJECT.ORDER_UPDATE, MAIL_BODY("ORDER_UPDATE", {
                id: orderId,
                status: BOOKING_STATUS[BOOKING_CODE.Confirmed],
            }));

            // Mail to Service Provider
            sendMail(ServiceProviderDetails.Username.Email_id, MAIL_SUBJECT.ORDER_ASSIGN, MAIL_BODY("ORDER_ASSIGN", {
                id: orderId,
            }));

            req.flash("response", "Order assigned Successfully");
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
            include: [
                { model: Registration, as: "User" }
            ]
        });
        if (!data) {
            req.flash("response", "Order does not exist");
            return res.redirect(`/serviceprovider/order/${orderId}`);
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
            sendMail(data.User.Email_id, MAIL_SUBJECT.ORDER_UPDATE, MAIL_BODY("ORDER_UPDATE", {
                id: orderId,
                status: BOOKING_STATUS[bookingStatus],
            }));
            req.flash("response", "Data updated Successfully");
            return res.redirect(`/serviceprovider/order/${orderId}`);
        }

        return res.redirect(`/serviceprovider/order/${orderId}`);
    } catch (error) {
        console.log(error);
        return res.redirect(`/serviceprovider/order/${orderId}`);
    }
};

module.exports = {
    viewOrder,
    assignServiceProvider,
    updateOrderDetails,
};
