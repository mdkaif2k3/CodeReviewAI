import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import { getReviewHistory } from "../services/reviewService";

function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const data = await getReviewHistory();
            setReviews(data.reviews);
        } finally {
            setLoading(false);
        }
    };
    
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Review History</h1>
        {reviews.map((review) => (
          <Card key={review.id}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl text-white">{review.project.name}</h2>
                <p className="text-slate-400">{review.reviewType}</p>
              </div>
              <div>
                <p className="text-white">
                  Score
                  {review.overallScore}
                </p>
                <Link to={`/reviews/${review.id}`} className="text-blue-400">
                  View Details
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
}

export default History;