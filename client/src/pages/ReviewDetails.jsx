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

    return (
      <div>
        <Card>
          <h1 className="text-3xl text-white">{review.project.name}</h1>
          <p>
            Language:
            {review.language}
          </p>
          <p>
            Review Type:
            {review.reviewType}
          </p>
          <p>
            Score:
            {review.overallScore}
          </p>
          <p>
            Summary:
            {review.summary}
          </p>
        </Card>
      </div>
    );
}

export default ReviewDetails;