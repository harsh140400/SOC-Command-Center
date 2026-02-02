import api from "./axios";

export async function getAlerts(limit = 200) {
    const res = await api.get(`/alerts?limit=${limit}`);
    return res.data;
}

export async function getAlertById(id) {
    const res = await api.get(`/alerts/${id}`);
    return res.data;
}

export async function updateAlert(id, payload) {
    const res = await api.put(`/alerts/${id}`, payload);
    return res.data;
}