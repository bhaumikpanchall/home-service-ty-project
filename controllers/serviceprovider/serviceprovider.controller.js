const {
    service_provider_details, Category, Registration, City, Booking
} = require("../../models");
const { BOOKING_STATUS, PAYMENT_STATUS, PAYMENT_TYPE } = require("../../utils/constants");

const rendeServiceProviderDetails = async (req, res) => {
    try {
        const data = await Category.findAll({
            where: {
                isActive: 1,
            },
        });
        return res.render("serviceprovider/serviceproviderdetails", { data });
    } catch (e) {
        console.log("error :", e);
    }
};

const addServiceProviderDetails = async (req, res) => {
    try {
        const {
            Experience,
            DOB,
            Document_name,
            Category_id,
        } = req.body;
        // req.file.path = public\uploads\img_1672077447983.jpg
        // let finalPath = uploads\img_1672077447983.jpg
        console.log({
            Experience,
            DOB,
            Document_name,
            path: req.file.path,
            Category_id,
        });
        await service_provider_details.create({
            User_id: 1,
            Experience,
            DOB,
            Document_name,
            Document_image: req.file.path,
            Category_id,
        });
        req.flash("response", "Registration Successfull");
        res.redirect("/login");
    } catch (e) {
        console.log("error :", e);
    }
}

const viewServiceProviderDetails = async (req, res) => {
    try {
        const data = await service_provider_details.findAll({
            where: {
                isActive: 1,
            },
            include: [
                { model: Category, as: "Category" },
                { model: Registration, as: "Username" }
            ],
        });
        // console.log({ data: data[0].dataValues.Username.dataValues.Fname })
        res.render("serviceprovider/serviceman", { data });
    } catch (e) {
        console.log("error :", e);
    }
};

const deleteServiceProviderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await service_provider_details.findOne({
            where: { id },
        });
        if (!data) {
            req.flash("response", "City does not exist");
            //req.flash("response", errorResponse(req, res, "Category does not exist"));
            return res.redirect("/serviceprovider");
        }

        const deleteDetails = await service_provider_details.update({ isActive: 2 }, { where: { id } });
        // const deletedCat = await Category.destroy({ where: { id } });
        if (deleteDetails) {
            // req.flash(
            //   "response",
            //   successResponse(req, res, "Data Deleted Successfully")
            // );
            req.flash("response", "Data Deleted Successfully");
            return res.redirect("/serviceprovider");
        }
        // req.flash(
        //   "response",
        //   errorResponse(req, res, "Error occured in delete data")
        // );
        return res.redirect("/serviceprovider");
    } catch (error) {
        // req.flash("response", errorResponse(req, res, error.message));
        console.log(error);
        return res.redirect("/serviceprovider");
    }
};

const serviceManMoreDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await service_provider_details.findAll({
            where: {
                isActive: 1,
                User_id: id
            },
            include: [
                { model: Category, as: "Category" },
                {
                    model: Registration, as: "Username", include: [
                        { model: City, as: "City" }
                    ]
                }
            ],
        });
        res.render("admin/servicemandetails", { data });
    } catch (e) {
        console.log("error :", e);
    }
};

const fetchServiceProviderDetailsByCategory = async (req, res) => {

    try {
        const data = await service_provider_details.findAll({
            where: {
                isActive: 1,
            },
            include: [
                {
                    model: Category, as: "Category",
                    where: {
                        id: parseInt(req.body.id),
                        isActive: 1,
                    }
                },
                { model: Registration, as: "Username" }
            ],
        });

        return res.send(data);
    } catch (e) {
        console.log("error :", e);
    }
};

const fetchMyOrders = async (req, res) => {
    const userId = req.user.id;

    try {

        const serviceProviderData = await service_provider_details.findOne({
            where: {
                User_id: userId,
                isActive: 1,
            }
        });

        let data = await Booking.findAll({
            where: {
                isActive: 1,
                service_provider_id: serviceProviderData.id,
            },
            include: [
                { model: Category, as: "Category_Booking" },
                { model: Registration, as: "User" },
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

        return res.render("serviceprovider/mybookings", { data: data });
    } catch (e) {
        console.log("error :", e);
    }
};

const fetchOrderById = async (id) => {
    try {

        let data = await Booking.findAll({
            where: {
                isActive: 1,
                id,
            },
            include: [
                { model: Category, as: "Category_Booking" },
                {
                    model: Registration, as: "User",
                    include: [
                        { model: City, as: "City" },
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

        return data;
    } catch (e) {
        console.log("error :", e);
    }
}


const fetchMyOrderById = async (req, res) => {

    const { id } = req.params;

    try {
        const data = await fetchOrderById(id);

        return res.render("serviceprovider/bookingdetails", { data: data });
    } catch (e) {
        console.log("error :", e);
    }
};

const fetchMyOrderByIdForUpdate = async (req, res) => {

    const { id } = req.params;

    try {
        const data = await fetchOrderById(id);

        return res.render("serviceprovider/updatebookingdetails", { data: data });
    } catch (e) {
        console.log("error :", e);
    }
};

module.exports = {
    rendeServiceProviderDetails,
    addServiceProviderDetails,
    viewServiceProviderDetails,
    deleteServiceProviderDetails,
    serviceManMoreDetails,
    fetchServiceProviderDetailsByCategory,
    fetchMyOrders,
    fetchMyOrderById,
    fetchMyOrderByIdForUpdate,
};