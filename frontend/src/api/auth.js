import api from "./axios";

export async function loginApi(username, password) {
    const res = await api.post("/auth/login", { username, password });
    return res.data;
}

export function logout() {
    localStorage.removeItem("soc_token");
    localStorage.removeItem("soc_user");
    localStorage.removeItem("soc_role");
}