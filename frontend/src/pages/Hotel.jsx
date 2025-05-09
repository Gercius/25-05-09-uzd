import { useNavigate, useParams } from "react-router-dom";
import { useHotels } from "../context/HotelContext";
import { useLoading } from "../context/LoadingContext";
import { useEffect, useState } from "react";

const Hotel = () => {
    const { getHotelById } = useHotels();
    const { id } = useParams();

    const { setLoading } = useLoading();
    // const navigate = useNavigate();
    const [hotel, setHotel] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchHotel = async (id) => {
            setError(null);
            setLoading(true);
            try {
                const data = await getHotelById(id);
                setHotel(data ? data : []);
            } catch (err) {
                setError(`Klaida: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchHotel(id);
    }, [id]);

    return <div>{hotel.name}</div>;
};

export default Hotel;
