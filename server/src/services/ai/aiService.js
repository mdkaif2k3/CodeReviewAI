const { buildPrompt } = require("./promptBuilder");
const { validateAIResponse } = require("./responseValidator");
const { generateCompletion } = require("./providers/groqProvider");
const aiConfig = require("../../config/ai");

async function analyzeCode({ language, reviewType, code }) {
    const { systemPrompt, userPrompt } = buildPrompt({ language, reviewType, code });
    
    for (let attempt = 1; attempt <= aiConfig.maxRetries; attempt++) {
        try {
            const response = await generateCompletion(systemPrompt, userPrompt);
            const parsed = JSON.parse(response);
            validateAIResponse(parsed);
            return parsed;
        } catch (error) {
            if (attempt === 2) {
                throw error;
            }
            console.log(`Retrying AI request... (${attempt})`);
        }
    }
}

module.exports = { analyzeCode };