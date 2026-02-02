import api from "./axios";

export async function uploadLogs(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/logs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
}

export async function autoIngest() {
    const res = await api.post("/logs/auto-ingest");
    return res.data;
}

export async function getEvents(limit = 200) {
    const res = await api.get(`/logs/events?limit=${limit}`);
    return res.data;
}