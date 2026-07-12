import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Card from "../components/common/Card";

function ReviewDetails() {
    const { id } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        loadReview();
    }, []);

    const loadReview = async () => {
        const response = await api.get(`/reviews/${id}`);
        setReview(response.data.review);
    };

    if (!review) {
        return (
            <p className="text-white">
                Loading...
            </p>
        );
    }

    const getSeverityColor = (severity) => {
      switch (severity) {
          case "CRITICAL":
              return "text-red-600";
          case "HIGH":
              return "text-red-500";
          case "MEDIUM":
              return "text-yellow-400";
          case "LOW":
              return "text-green-400";
          default:
              return "text-slate-400";
      }
    };

    return (
      <div>
        <Card>
          <h1 className="text-3xl font-bold text-white mb-6">AI Code Review</h1>
          <div className="space-y-3">
            <h2 className="text-5xl font-bold text-green-400">
              {review.overallScore}/100
            </h2>
            <p className="text-slate-300">Overall Score</p>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Status</h2>
          <p className="mt-3 text-lg text-green-400">{review.status}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-slate-300 leading-7">{review.summary}</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-white mb-6">
            Review Findings
          </h2>
          {review.findings.length === 0 ? (
            <p className="text-slate-400">No issues found.</p>
          ) : (
            review.findings.map((finding) => (
              <div key={finding.id} className="mb-6 border-b border-slate-700 pb-6">
                <h3 className="text-xl font-semibold text-white">
                  {finding.issue}
                </h3>
                <p className="mt-2">
                  Severity:
                  <strong>{finding.severity}</strong>
                </p>
                <p className="mt-3">{finding.explanation}</p>
                <p className="mt-3 text-green-400">Suggested Fix</p>
                <p>{finding.suggestedFix}</p>
                {finding.lineNumber && (
                  <p className="mt-3 text-slate-400">
                    Line:
                    {finding.lineNumber}
                  </p>
                )}
              </div>
            ))
          )}
        </Card>
        
      </div>
    );
}

export default ReviewDetails;