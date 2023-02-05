const { service_provider_details, Category } = require("../../models");

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
            category,
        } = req.body;
        // req.file.path = public\uploads\img_1672077447983.jpg
        // let finalPath = uploads\img_1672077447983.jpg
        console.log({
            Experience,
            DOB,
            Document_name,
            path: req.file.path,
            category,
        });
        await service_provider_details.create({
            User_id: 1,
            Experience,
            DOB,
            Document_name,
            Document_image: req.file.path,
            category,
        });
        req.flash("response", "Registration Successfull");
        res.redirect("/login");
    } catch (e) {
        console.log("error :", e);
    }
}

module.exports = {
    rendeServiceProviderDetails,
    addServiceProviderDetails,
};