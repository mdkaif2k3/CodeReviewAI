function buildPrompt({ language, reviewType, code }) {
    return `You are an expert software engineer.
    Review the following ${language} code.
    Focus on:
    ${reviewType}
    Return ONLY valid JSON.
    {
    "overallScore": number,
    "summary": string,
    "findings": [
        {
        "severity": "LOW | MEDIUM | HIGH | CRITICAL",
        "issue": string,
        "explanation": string,
        "suggestedFix": string,
        "lineNumber": number
        }
    ]
    }
    Source Code:
    ${code}`;
}

module.exports = { buildPrompt };