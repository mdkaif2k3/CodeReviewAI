const { getDashboard } = require("../services/dashboardService");

async function getDashboardData(req, res) {
    try {
        const dashboard = await getDashboard(req.user.id);

        return res.status(200).json({
            success: true,
            dashboard,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { getDashboardData };