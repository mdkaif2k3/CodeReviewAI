const { buildPrompt } = require("./promptBuilder");
const { generateCompletion } = require("./providers/groqProvider");

async function analyzeCode({ language, reviewType, code }) {
    const prompt = buildPrompt({ language, reviewType, code });
    const response = await generateCompletion(prompt);
    return JSON.parse(response);
}

module.exports = { analyzeCode };