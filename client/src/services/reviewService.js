import api from "./api";

export const createReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData);

    return response.data;
};

export const getReviewHistory = async () => {
    const response = await api.get("/reviews");

    return response.data;
};