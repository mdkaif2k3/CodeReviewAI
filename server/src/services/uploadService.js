const prisma = require("../config/prisma");

const languageMap = { js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", py: "python", java: "java", cpp: "cpp", c: "c", cs: "csharp", go: "go", php: "php", rb: "ruby" };

async function saveUploadedFile({ file, projectId }) {

    const extension = file.originalname.split(".").pop().toLowerCase();
    const language = languageMap[extension] || "unknown";
    const uploadedFile = await prisma.uploadedFile.create({
            data: {
                originalName: file.originalname,
                storedName: file.filename,
                language,
                path: file.path,
                projectId,
            },
        });
    return uploadedFile;
}

module.exports = {
    saveUploadedFile,
};