import { Link, useParams } from "react-router-dom";
import { useHotels } from "../context/HotelContext";
import { useLoading } from "../context/LoadingContext";
import { useEffect, useState } from "react";

const Hotel = () => {
    const { getHotelById } = useHotels();
    const { id } = useParams();

    const { setLoading } = useLoading();
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
        <div className="hotel-page px-3 px-md-5">
            <Link to="/hotels" className="nav-link my-2">
                ← Grįžti į Viešbučius
            </Link>
            <div
                className="hotel-info-wrapper mx-auto mt-3 px-3 px-sm-4 px-md-5 py-4 col-10 border border-3 rounded-3  d-flex justify-content-center flex-column"
                style={{ maxWidth: "600px" }}
            >
                <h2>{hotel.name}</h2>
                {hotel.image_cover && <img src={hotel.image_cover} alt={`${hotel.name} viesbutis`} />}
                <div className="mt-2">
                    <span>Kaina - {hotel.price}€ </span>
                    <br />
                    {hotel.price_discount > 0 && (
                        <>
                            <span>Nuolaida - {hotel.price_discount}% </span>
                            <br />
                        </>
                    )}
                    <span>Reitingas - {hotel.ranking} </span>
                    <br />
                    <span>Komfortas - {hotel.comfort}</span>
                </div>
                <p className="my-2">{hotel.summary}</p>
                <p>{hotel.description}</p>
            </div>
        </div>
    );
};

export default Hotel;
