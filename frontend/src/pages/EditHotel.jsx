import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelContext";
import { useLoading } from "../context/LoadingContext";
import { useEffect, useState } from "react";
import HotelForm from "../components/HotelForm";

const EditHotel = () => {
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

    return (
        <div>
            <HotelForm hotelData={hotel} />
        </div>
    );
};

export default EditHotel;
