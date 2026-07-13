const systemPrompt = `You are a Senior Software Engineer with over 15 years of experience in software architecture, secure coding, performance optimization, and code quality.
Your job is to perform professional code reviews.

Rules:
- Be objective.
- Never invent issues.
- Only report issues that actually exist.
- Explain every finding clearly.
- Suggest practical fixes.
- If the code is already good, say so.
- Return ONLY valid JSON.
- Do NOT wrap the JSON in markdown.
- Do NOT include any explanations outside the JSON.`;



function buildPrompt({ language, reviewType, code }) {
    const systemPrompt = `You are a Senior Software Engineer with over 15 years of experience in software architecture, secure coding, performance optimization, and code quality.
    Your job is to perform professional code reviews.
    Rules:
    - Be objective.
    - Never invent issues.
    - Only report issues that actually exist.
    - Explain every finding clearly.
    - Suggest practical fixes.
    - If the code is already good, say so.
    - Return ONLY valid JSON.
    - Do NOT wrap the JSON in markdown.
    - Do NOT include any explanations outside the JSON.`;

    const userPrompt = `Review the following ${language} source code.
    Review Type:
    ${reviewType}
    Evaluate the code using these categories:
    1. Security
    2. Performance
    3. Readability
    4. Maintainability
    5. Best Practices

    Severity Levels:
    CRITICAL
    - Remote Code Execution
    - Authentication Bypass
    - Sensitive Data Exposure

    HIGH
    - SQL Injection
    - Command Injection
    - Hardcoded Credentials

    MEDIUM
    - Poor Validation
    - Performance Problems
    - Code Duplication

    LOW
    - Formatting
    - Naming
    - Minor Improvements

    Scoring Guide:

    95-100
    Production Ready

    85-94
    Excellent

    75-84
    Good

    60-74
    Needs Improvement

    Below 60
    Major Problems

    Return ONLY this JSON structure:

    {
    "overallScore": number,

    "summary": string,

    "strengths": [
        string
    ],

    "recommendations": [
        string
    ],

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

    return { systemPrompt, userPrompt };
}

module.exports = { buildPrompt };