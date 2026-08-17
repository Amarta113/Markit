const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://markit-backend-tau.vercel.app/api/v1"

export const server = apiBaseUrl

export const backend_url = apiBaseUrl.replace(/\/api\/v1$/, "/")

export const socket_url = "https://markit-socketio.vercel.app/"