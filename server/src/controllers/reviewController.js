const { createReview, getReviews, getReviewById } = require("../services/reviewService");
const { getProjectById } = require("../services/projectService");

async function create(req, res) {
    try {
        const { projectId, language, reviewType } = req.body;

        if (!projectId || !language || !reviewType) {
            return res.status(400).json({
                success: false,
                message: "Project, language and review type are required.",
            });
        }

        const project = await getProjectById(Number(projectId), req.user.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }
        const review = await createReview({
            projectId: Number(projectId),
            language,
            reviewType,
        });
        return res.status(201).json({
            success: true,
            message: "Review created successfully.",
            review,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function getAll(req, res) {
    try {
        const reviews = await getReviews(req.user.id);

        return res.status(200).json({
            success: true,
            reviews,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function getOne(req, res) {
    try {
        const review = await getReviewById(Number(req.params.id), req.user.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found.",
            });
        }
        return res.status(200).json({
            success: true,
            review,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { create, getAll, getOne };