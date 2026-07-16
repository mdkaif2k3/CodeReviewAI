const { getProfile } = require("../services/profileService");

async function getUserProfile(req, res) {

    try {
        const user = await getProfile(req.user.id);

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { getUserProfile };