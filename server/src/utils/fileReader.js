const fs = require("fs/promises");

async function readSourceFile(path) {
    const code = await fs.readFile(path, "utf-8");
    return code;
}

module.exports = { readSourceFile };