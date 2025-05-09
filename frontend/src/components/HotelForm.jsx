import { useEffect, useState } from "react";
import { useHotels } from "../context/HotelContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const HotelForm = ({ hotelData }) => {
    const { id } = useParams();
    const location = useLocation();
    const isEditFormOpen = location.pathname.includes("edit");
    const navigate = useNavigate();
    const { createHotel, editHotel } = useHotels();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        ranking: 1,
        price: 0,
        price_discount: 0,
        comfort: 1,
        summary: "",
        description: "",
        image_cover: "",
    });

    // Populate existing data for editing
    useEffect(() => {
        if (hotelData) {
            setFormData({
                name: hotelData.name || "",
                address: hotelData.address || "",
                ranking: hotelData.ranking || 1,
                price: hotelData.price || 0,
                price_discount: hotelData.price_discount || 0,
                comfort: hotelData.comfort || 1,
                summary: hotelData.summary || "",
                description: hotelData.description || "",
                image_cover: hotelData.image_cover || "",
            });
        }
    }, [hotelData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isEditFormOpen ? await editHotel(id, formData) : await createHotel(formData);
        setFormData({
            name: "",
            address: "",
            ranking: 1,
            price: 0,
            price_discount: 0,
            comfort: 1,
            summary: "",
            description: "",
            image_cover: "",
        });
        navigate("/hotels");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
            <div>
                <label>Pavadinimas:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
                <label>Adresas:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div>
                <label>Reitingas (1-5):</label>
                <input
                    type="number"
                    name="ranking"
                    min="1"
                    max="5"
                    value={formData.ranking}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Kaina:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            <div>
                <label>Nuolaida (neprivaloma):</label>
                <input type="number" name="price_discount" value={formData.price_discount} onChange={handleChange} />
            </div>

            <div>
                <label>Komfortas (1-7):</label>
                <input
                    type="number"
                    name="comfort"
                    step="1"
                    min="1"
                    max="7"
                    value={formData.comfort}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Arašymas:</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} required />
            </div>

            <div>
                <label>Papildoma info (neprivaloma):</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>

            <div>
                <label>Nuotraukos nuoroda (neprivaloma):</label>
                <input type="text" name="image_cover" value={formData.image_cover} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">
                {isEditFormOpen ? "Redaguoti" : "Pridėti"}
            </button>
            <Link to="/hotels" className="btn btn-primary mx-2">
                Atšaukti
            </Link>
        </form>
    );
};

export default HotelForm;
