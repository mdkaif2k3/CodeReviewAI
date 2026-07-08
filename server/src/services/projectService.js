const prisma = require("../config/prisma");

async function createProject({ name, description, userId }) {
    const project = await prisma.project.create({
        data: {
            name,
            description,
            userId,
        },
    });

    return project;
}

async function getProjects(userId) {
    return await prisma.project.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async function getProjectById(id, userId) {
    return await prisma.project.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            uploadedFiles: true,
            reviews: true,
        },
    });
}

async function deleteProject(id, userId) {
    const project = await prisma.project.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!project) {
        throw new Error("Project not found.");
    }

    await prisma.project.delete({
        where: {
            id,
        },
    });

    return {
        message: "Project deleted successfully.",
    };
}

module.exports = { createProject, getProjects, getProjectById, deleteProject };