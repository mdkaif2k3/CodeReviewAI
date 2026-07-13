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

    function getScoreRating(score) {
        if (score >= 95) return "Production Ready";
        if (score >= 85) return "Excellent";
        if (score >= 75) return "Good";
        if (score >= 60) return "Needs Improvement";
        return "Major Problems";
    }

    return (
      <div>
        <Card>
          <h1 className="text-3xl font-bold text-white mb-6">AI Code Review</h1>
          <div className="space-y-3">
            <h2 className="text-5xl font-bold text-green-400">
              {review.overallScore}/100
            </h2>
            <p>{getScoreRating(review.overallScore)}</p>
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
          <h2 className="text-2xl font-bold text-white mb-4">Strengths</h2>
          {review.strengths?.length ? (
            <ul className="space-y-3">
              {review.strengths.map((strength, index) => (
                <li key={index} className="text-green-400 flex gap-2">
                  <span>✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No strengths available.</p>
          )}
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">
            Recommendations
          </h2>
          {review.recommendations?.length ? (
            <ul className="space-y-3">
              {review.recommendations.map((recommendation, index) => (
                <li key={index} className="text-blue-300 flex gap-2">
                  <span>•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No recommendations available.</p>
          )}
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-white mb-6">
            Review Findings
          </h2>
          {review.findings.length === 0 ? (
            <p className="text-slate-400">No issues found.</p>
          ) : (
            review.findings.map((finding) => (
              <div
                key={finding.id}
                className="mb-6 border-b border-slate-700 pb-6"
              >
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
        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
            {review.status}
        </span>
      </div>
    );
}

export default ReviewDetails;