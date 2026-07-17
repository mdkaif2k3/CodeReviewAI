const { createReview, getReviews, getReviewById, deleteReview } = require("../services/reviewService");
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

        console.error("========== REVIEW ERROR ==========");
        console.error(error);
        console.error("==================================");


        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function getAll(req, res) {
    try {
        const reviews = await getReviews({
            userId: req.user.id,
            search: req.query.search,
            language: req.query.language,
            reviewType: req.query.reviewType,
            status: req.query.status,
            sort: req.query.sort,
        });

        return res.status(200).json({
            success: true,
            reviews,
        });
    }
    catch (error) {
        console.error(error);
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

async function del(req, res) {
    try {
        const result = await deleteReview(
            Number(req.params.id),
            req.user.id
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

module.exports = { create, getAll, getOne, del };