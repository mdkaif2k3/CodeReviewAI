const { saveUploadedFile } = require("../services/uploadService");
const { getProjectById } = require("../services/projectService");

async function upload(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a source code file.",
            });
        }
        const projectId = Number(req.body.projectId);
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required.",
            });
        }
        const project = await getProjectById(
            projectId,
            req.user.id
        );
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }
        const uploadedFile = await saveUploadedFile({
            file: req.file,
            projectId,
        });
        return res.status(201).json({
            success: true,
            message: "File uploaded successfully.",
            file: uploadedFile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { upload };