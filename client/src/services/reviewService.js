import api from "./api";

export const createReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData);

    return response.data;
};

export async function getReviewHistory(filters = {}) {
    const response = await api.get("/reviews", { params: filters });
    return response.data;
}

export async function getReviewById(id) {
    const response = await api.get(`/reviews/${id}`);

    return response.data;
}

export async function deleteReview(id) {
    const response = await api.delete(`/reviews/${id}`);

    return response.data;
}