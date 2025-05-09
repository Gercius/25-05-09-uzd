import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import * as hotelServices from "../services/HotelServices";

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const { token, getResponse } = useAuth();

    const getHotels = async (queryParams = {}) => {
        const hotels = await hotelServices.getHotels(token, queryParams);

        return hotels?.map((hotel) => ({
            ...hotel,
            id: hotel.id,
        }));
    };

    const getHotelById = async (id) => {
        const response = await getResponse(hotelServices.getHotelById(id, token));

        const hotel = response.data.hotel || null;

        return hotel ? { ...hotel, id: hotel.id } : null;
    };

    const createHotel = async (data) => await getResponse(hotelServices.createHotel(data, token));

    const editHotel = async (id, data) => await getResponse(hotelServices.updateHotel(id, data, token));

    const deleteHotel = async (id) => await getResponse(hotelServices.deleteHotel(id, token));

    return (
        <HotelContext.Provider value={{ getHotels, getHotelById, createHotel, editHotel, deleteHotel }}>
            {children}
        </HotelContext.Provider>
    );
};

export const useHotels = () => {
    const context = useContext(HotelContext);

    if (!context) throw new Error("use hotels turi buti naudojamas su HotelProvider");

    return context;
};
