const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const allowedExtensions = [ ".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".cpp", ".c", ".cs", ".go", ".php", ".rb" ];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = crypto.randomUUID() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

function fileFilter(req, file, cb) {

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only source code files are allowed."
            ),
            false
        );
    }
}

const upload = multer({ storage, fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

module.exports = upload.single("file");