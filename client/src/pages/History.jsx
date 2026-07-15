import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import { getReviewHistory } from "../services/reviewService";

function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const [reviewType, setReviewType] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        loadReviews();
    }, [search, language, reviewType, status, sort]);

    async function loadReviews() {
        try {
            const data = await getReviewHistory({
                search,
                language,
                reviewType,
                status,
                sort,
            });

            setReviews(data.reviews);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-2xl text-slate-400">
                    Loading Reviews...
                </h1>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">
                Review History
            </h1>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white">
                        <option value="">All Languages</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                    </select>
                    <select value={reviewType} onChange={(e) => setReviewType(e.target.value)} className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white">
                        <option value="">All Review Types</option>
                        <option value="Security">Security</option>
                        <option value="Performance">Performance</option>
                        <option value="Best Practices">Best Practices</option>
                        <option value="Maintainability">Maintainability</option>
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white">
                        <option value="">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="FAILED">Failed</option>
                    </select>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="score_desc">Highest Score</option>
                        <option value="score_asc">Lowest Score</option>
                    </select>
                </div>
            </Card>
            {reviews.length === 0 ? (
                <Card>
                    <p className="text-slate-400 text-center">
                        No reviews found.
                    </p>
                </Card>
            ) : (
                reviews.map((review) => (
                    <Card key={review.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {review.project.name}
                                </h2>
                                <p className="text-slate-400">
                                    {review.language}
                                </p>
                                <p className="text-slate-400">
                                    {review.reviewType}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400 font-bold text-xl">
                                    {review.overallScore}/100
                                </p>
                                <p className="text-slate-400">
                                    {review.status}
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 text-slate-300">
                            {review.summary.length > 120 ? review.summary.substring(0, 120) + "..." : review.summary}
                        </p>
                        <div className="mt-4">
                            <Link to={`/reviews/${review.id}`} className="text-blue-400 hover:text-blue-300">
                                View Details →
                            </Link>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}

export default History;