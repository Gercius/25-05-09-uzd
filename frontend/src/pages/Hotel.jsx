import { useParams } from "react-router-dom";

const Hotel = () => {
    const id = useParams();
    console.log(id);

    return <div>Hotel</div>;
};

export default Hotel;
