const prisma = require("../config/prisma");

async function createReview({ projectId, language, reviewType}) {
    const review = await prisma.review.create({
        data: {
            projectId,
            language,
            reviewType,
            overallScore: 0,
            summary: "Pending AI analysis...",
        },
    });

    return review;
}

async function getReviews(userId) {
    return await prisma.review.findMany({
        where: {
            project: {
                userId,
            },
        },
        include: {
            project: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async function getReviewById(id, userId) {
    return await prisma.review.findFirst({
        where: {
            id,
            project: {
                userId,
            },
        },
        include: {
            project: true,
            findings: true,
        },
    });
}

module.exports = { createReview, getReviews, getReviewById };