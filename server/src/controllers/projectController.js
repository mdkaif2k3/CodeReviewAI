const { createProject, getProjects, getProjectById, deleteProject } = require("../services/projectService");

async function create(req, res) {
    try {
        const { name, description } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Project name is required.",
            });
        }

        const project = await createProject({
            name: name.trim(),
            description,
            userId: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully.",
            project,
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

        const projects = await getProjects(req.user.id);

        return res.status(200).json({
            success: true,
            projects,
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

        const project = await getProjectById(
            Number(req.params.id),
            req.user.id
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            success: true,
            project,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

async function remove(req, res) {
    try {

        const result = await deleteProject(
            Number(req.params.id),
            req.user.id
        );

        return res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }
}

module.exports = { create, getAll, getOne, remove };