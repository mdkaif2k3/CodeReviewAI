import jsPDF from "jspdf";

export function exportReviewPDF(review) {
    const doc = new jsPDF();
    let y = 20;
    const addSection = (title) => {
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(title, 15, y);
        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
    };
    const addParagraph = (text = "") => {
        const lines = doc.splitTextToSize(text, 180);
        doc.text(lines, 15, y);
        y += lines.length * 6 + 4;
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    };
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("AI Code Review Report", 15, y);
    y += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Project: ${review.project.name}`, 15, y);
    y += 8;
    doc.text(`Language: ${review.language}`, 15, y);
    y += 8;
    doc.text(`Review Type: ${review.reviewType}`, 15, y);
    y += 8;
    doc.text(`Status: ${review.status}`, 15, y);
    y += 8;
    doc.text(`Overall Score: ${review.overallScore}/100`, 15, y);
    addSection("Summary");
    addParagraph(review.summary);
    addSection("Strengths");
    if (review.strengths?.length) {
        review.strengths.forEach((strength) => {
            addParagraph(`• ${strength}`);
        });
    } else {
        addParagraph("No strengths available.");
    }
    addSection("Recommendations");
    if (review.recommendations?.length) {
        review.recommendations.forEach((recommendation) => {
            addParagraph(`• ${recommendation}`);
        });
    } else {
        addParagraph("No recommendations available.");
    }
    addSection("Findings");
    if (review.findings.length === 0) {
        addParagraph("No findings.");
    } else {
        review.findings.forEach((finding, index) => {
            doc.setFont("helvetica", "bold");
            doc.text(`${index + 1}. ${finding.severity} - ${finding.issue}`, 15, y);
            y += 8;
            doc.setFont("helvetica", "normal");
            addParagraph(`Explanation: ${finding.explanation}`);
            addParagraph(`Suggested Fix: ${finding.suggestedFix}`);
            if (finding.lineNumber) {
                addParagraph(`Line Number: ${finding.lineNumber}`);
            }
            y += 4;
        });
    }
    doc.save(
        `${review.project.name.replace(/\s+/g, "_")}_Review_Report.pdf`
    );
}