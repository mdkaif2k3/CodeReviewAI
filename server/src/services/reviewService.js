const prisma = require("../config/prisma");
const { analyzeCode } = require("./ai/aiService");
const { readSourceFile } = require("../utils/fileReader");

async function createReview({ projectId, language, reviewType}) {
    
    let review;

    try {
        review = await prisma.review.create({
            data: {
                projectId,
                language,
                reviewType,
                overallScore: 0,
                summary: "Pending AI analysis...",
            },
        });

        await prisma.review.update({
            where: {
                id: review.id,
            },
            data: {
                status: "PROCESSING",
            },
        });

        const uploadedFile = await prisma.uploadedFile.findFirst({
            where: {
                projectId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const code = await readSourceFile(uploadedFile.path);
        const aiResult = await analyzeCode({language, reviewType, code });

        await prisma.review.update({
            where: {
                id: review.id,
            },
            data: {
                overallScore: aiResult.overallScore,
                summary: aiResult.summary,
                status: "COMPLETED",
            },
        });

        for (const finding of aiResult.findings) {
            await prisma.reviewFinding.create({
                data: {
                    severity: finding.severity,
                    issue: finding.issue,
                    explanation: finding.explanation,
                    suggestedFix: finding.suggestedFix,
                    lineNumber: finding.lineNumber,
                    reviewId:review.id,
                },
            });
        }

        return await prisma.review.findUnique({
            where: {
                id: review.id,
            },
            include: {
                findings: true,
                project: true,
            },
        });
    } catch (error) {
        if (review) {
            await prisma.review.update({
                where: {
                    id: review.id,
                },
                data: {
                    status: "FAILED",
                    summary: error.message,
                },
            });
        }
        throw error;
    }
} 

async function getReviews({ userId, search = "", language, reviewType, status, sort = "newest" }) {
    const where = {
        project: {
            userId,
        },
    };

    if (search) {
        where.OR = [
            {
                project: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },
            {
                summary: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    if (language) {
        where.language = language;
    }

    if (reviewType) {
        where.reviewType = reviewType;
    }

    if (status) {
        where.status = status;
    }

    let orderBy = { createdAt: "desc" };
    switch (sort) {
        case "oldest":
            orderBy = {
                createdAt: "asc",
            };
            break;
        case "score_desc":
            orderBy = {
                overallScore: "desc",
            };
            break;
        case "score_asc":
            orderBy = {
                overallScore: "asc",
            };
            break;
    }

    return await prisma.review.findMany({
        where,
        include: {
            project: true,
        },
        orderBy,
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

async function deleteReview(id, userId) {
    const review = await prisma.review.findFirst({
        where: {
            id,
            project: {
                userId,
            },
        },
    });

    if (!review) {
        throw new Error("Review not found.");
    }

    await prisma.review.delete({
        where: {
            id,
        },
    });

    return {
        message: "Review deleted successfully.",
    };
}

module.exports = { createReview, getReviews, getReviewById, deleteReview };