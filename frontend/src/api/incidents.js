import api from "./axios";

export async function getIncidents(limit = 200) {
    const res = await api.get(`/incidents?limit=${limit}`);
    return res.data;
}

export async function createIncident(payload) {
    const res = await api.post("/incidents", payload);
    return res.data;
}

export async function getIncidentById(id) {
    const res = await api.get(`/incidents/${id}`);
    return res.data;
}

export async function updateIncident(id, payload) {
    const res = await api.put(`/incidents/${id}`, payload);
    return res.data;
}