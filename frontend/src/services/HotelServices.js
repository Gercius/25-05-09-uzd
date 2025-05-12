import { fetchRequest } from "../utils/auth";

const API_URL = "http://localhost:8000/api/v1";

// Get hotels
export const getHotels = async (token, queryParams) => {
    const { id, fields, filter } = queryParams;
    const searchParams = new URLSearchParams();

    if (id) searchParams.append("id", id);
    if (fields) searchParams.append("fields", fields);
    if (filter) searchParams.append("filter", filter);

    const url = `/hotels/${searchParams.toString() ? `?${searchParams}` : ""}`;

    const res = await fetchRequest(API_URL, url, { method: "GET" }, token);

    return res.data.hotels;
};

// Get hotel by id
export const getHotelById = async (id, token) => {
    return await fetchRequest(API_URL, `/hotels/${id}`, { method: "GET" }, token);
};

// Sukuria naują viesbuti +
export const createHotel = async (hotelData, token) => {
    return fetchRequest(API_URL, "/hotels", { method: "POST", body: JSON.stringify(hotelData) }, token);
};

// Atnaujina viesbuti +
export const updateHotel = async (id, hotelData, token) => {
    return fetchRequest(API_URL, `/hotels/${id}`, { method: "PATCH", body: JSON.stringify(hotelData) }, token);
};

// Ištrina viesbuti +
export const deleteHotel = async (id, token) => {
    const response = await fetchRequest(API_URL, `/hotels/${id}`, { method: "DELETE" }, token);
    return response.hotel || null;
};
