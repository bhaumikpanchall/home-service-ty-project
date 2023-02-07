const { service_provider_details, Category, Registration } = require("../../models");

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
        console.log({ data: data[0].dataValues.Username.dataValues.Fname })
        res.render("serviceprovider/serviceman", { data });
    } catch (e) {
        console.log("error :", e);
    }
};

module.exports = {
    rendeServiceProviderDetails,
    addServiceProviderDetails,
    viewServiceProviderDetails
};