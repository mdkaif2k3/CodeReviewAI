function validateAIResponse(response) {

    if (!response) {
        throw new Error("Empty AI response.");
    }

    if (typeof response.overallScore !== "number") {
        throw new Error("Invalid overallScore.");
    }

    if (typeof response.summary !== "string") {
        throw new Error("Invalid summary.");
    }

    if (!Array.isArray(response.findings)) {
        throw new Error("Invalid findings.");
    }

    if (!Array.isArray(response.strengths)) {
        throw new Error("Invalid strengths.");
    }

    if (!Array.isArray(response.recommendations)) {
        throw new Error("Invalid recommendations.");
    }

    return true;
}

module.exports = { validateAIResponse };