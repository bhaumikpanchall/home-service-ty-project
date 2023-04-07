const { Registration, Feedback } = require("../../models");

const viewFeedbacks = async (req, res) => {
    try {
        const data = await Feedback.findAll({
            include: [{ model: Registration, as: "UserData" }],
        });
        res.render("admin/viewfeedbacks", { data });
    } catch (e) {
        console.log("error :", e);
    }
};

const editStatus = async (req, res) => {
    try {
        const feedbackData = await Feedback.findOne({
            where: { id: req.params.id },
        });
        let status = 1;

        if (feedbackData.isActive == 2) {
            status = 1;
        } else if (feedbackData.isActive == 1) {
            status = 2;
        }

        const payload = {
            isActive: status,
        };

        await Feedback.update(payload, { where: { id: req.params.id } });
        req.flash("response", "Data Updated Successfully");
        return res.redirect("/admin/feedbacks");

    } catch (error) {
        console.log({ error });
        return res.redirect("/admin/feedbacks");
    }
};

const viewFeedbacksForUsers = async () => {
    try {
        const data = await Feedback.findAll({
            where: { isActive: 2 },
            limit: 3,
            include: [{ model: Registration, as: "UserData" }],
        });
        return data;
    } catch (e) {
        console.log("error :", e);
    }
};

module.exports = {
    viewFeedbacks,
    editStatus,
    viewFeedbacksForUsers,
};
