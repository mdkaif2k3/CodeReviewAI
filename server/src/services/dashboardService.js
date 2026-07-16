const prisma = require("../config/prisma");

async function getDashboard(userId) {
    const totalProjects = await prisma.project.count({
        where: {
            userId,
        },
    });

    const totalReviews = await prisma.review.count({
        where: {
            project: {
                userId,
            },
        },
    });

    const average = await prisma.review.aggregate({
        where: {
            project: {
                userId,
            },
        },
        _avg: {
            overallScore: true,
        },
    });

    const criticalIssues = await prisma.reviewFinding.count({
        where: {
            severity: "CRITICAL",
            review: {
                project: {
                    userId,
                },
            },
        },
    });

    const highIssues = await prisma.reviewFinding.count({
        where: {
            severity: "HIGH",
            review: {
                project: {
                    userId,
                },
            },
        },
    });

    const mediumIssues = await prisma.reviewFinding.count({
        where: {
            severity: "MEDIUM",
            review: {
                project: {
                    userId,
                },
            },
        },
    });

    const lowIssues = await prisma.reviewFinding.count({
        where: {
            severity: "LOW",
            review: {
                project: {
                    userId,
                },
            },
        },
    });

    const languageDistribution = await prisma.review.groupBy({
        by: ["language"],
        where: {
            project: {
                userId,
            },
        },
        _count: {
            language: true,
        },
    });

    const recentReviews = await prisma.review.findMany({
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
        take: 3,
    });

    return {
        totalProjects,
        totalReviews,
        averageScore: Math.round(average._avg.overallScore ?? 0),
        criticalIssues,
        highIssues,
        mediumIssues,
        lowIssues,
        languageDistribution,
        recentReviews
    };
}

module.exports = { getDashboard };