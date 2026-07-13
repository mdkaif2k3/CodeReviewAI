const OpenAI = require("openai");
const aiConfig = require("../../config/ai");

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1",
});

async function generateCompletion(systemPrompt, userPrompt) {
    const response = await client.chat.completions.create({
        model:  aiConfig.model,
        temperature: aiConfig.temperature,
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
    });
    return response.choices[0].message.content;
}

module.exports = { generateCompletion };