const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1",
});

async function generateCompletion(prompt) {
    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "system",
                content: "You are a professional senior software engineer who reviews source code.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return response.choices[0].message.content;
}

module.exports = { generateCompletion };