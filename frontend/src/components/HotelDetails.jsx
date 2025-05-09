import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelContext";

const HotelDetails = ({ hotel, fetchHotels }) => {
    const { deleteHotel } = useHotels();

    const handleDeleteHotel = async (id) => {
        const confirmedDeletion = window.confirm("Ar tikrai ištrinti viešbutį?");
        if (confirmedDeletion) {
            await deleteHotel(id);
            await fetchHotels();
        } else {
            return;
        }
    };

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{hotel.name || "Be pavadinimo"}</h5>
                    <p className="card-text">
                        <strong>Aprašymas:</strong> {hotel.description || "Nėra aprašymo"}
                        <br />
                        <strong>Adresas:</strong> {hotel.address || "Nėra adreso"}
                        <br />
                        <strong>Reitingas:</strong> {hotel.ranking || "Nėra reitingo"}
                        <br />
                    </p>
                    <div className="card-actions">
                        <Link to={`/hotel/${hotel.id}`} className="btn btn-sm btn-primary">
                            Peržiūrėti
                        </Link>
                        <Link to={`/hotel/edit/${hotel.id}`} className="btn btn-sm btn-warning">
                            Redaguoti
                        </Link>
                        <button onClick={() => handleDeleteHotel(hotel.id)} className="btn btn-sm btn-danger">
                            Ištrinti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
