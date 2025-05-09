const API_URL = "http://localhost:8000/api/v1";

const getAuthHeaders = (token) => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
});

const fetchRequest = async (url, options = {}, token) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: { ...getAuthHeaders(token), ...options.headers },
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                const message = errorData.message || errorData.error || errorData.msg || "Ivyko klaida";
                console.error("Klaidos atsakymas is serverio:", errorData);
                throw new Error(message);
            } else {
                const text = await response.text();
                throw new Error(text || `HTTP error: ${response.status}`);
            }
        }

        return await response.json();
    } catch (err) {
        console.log("Uzklausos klaida: ", err.message);
    }
};

// Get hotels
export const getHotels = async (token, queryParams) => {
    const { id, fields, filter } = queryParams;
    const searchParams = new URLSearchParams();

    if (id) searchParams.append("id", id);
    if (fields) searchParams.append("fields", fields);
    if (filter) searchParams.append("filter", filter);

    const url = `/hotels/${searchParams.toString() ? `?${searchParams}` : ""}`;

    const res = await fetchRequest(url, { method: "GET" }, token);

    return res.data.hotels;
};

// Get hotel by id
export const getHotelById = async (id, token) => {
    return await fetchRequest(`/hotels/${id}`, { method: "GET" }, token);
};

// Sukuria naują viesbuti +
export const createHotel = async (hotelData, token) => {
    return fetchRequest("/hotels", { method: "POST", body: JSON.stringify(hotelData) }, token);
};

// Atnaujina viesbuti +
export const updateHotel = async (id, hotelData, token) => {
    return fetchRequest(`/hotels/${id}`, { method: "POST", body: JSON.stringify(hotelData) }, token);
};

// Ištrina viesbuti +
export const deleteHotel = async (id, token) => {
    const response = await fetchRequest(`/hotels/${id}`, { method: "DELETE" }, token);
    return response.hotel || null;
};
