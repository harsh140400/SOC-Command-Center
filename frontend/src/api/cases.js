import api from "./axios";

export async function getCases(limit = 200) {
    const res = await api.get(`/cases?limit=${limit}`);
    return res.data;
}

export async function createCase(payload) {
    const res = await api.post("/cases", payload);
    return res.data;
}

export async function getCaseById(id) {
    const res = await api.get(`/cases/${id}`);
    return res.data;
}

export async function updateCase(id, payload) {
    const res = await api.put(`/cases/${id}`, payload);
    return res.data;
}