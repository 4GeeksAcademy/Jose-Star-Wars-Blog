import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const STAR_WARS_PLACEHOLDER =
        "https://placehold.co/400x250/000000/FFE81F?text=STAR+WARS";


    // Fetching resources one at a time
    useEffect(() => {
        // 1. Fetch People
        fetch("https://www.swapi.tech/api/people/")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_data", resource: "people", payload: data.results }))
            .catch(err => console.error(err));

        // 2. Fetch Planets
        fetch("https://www.swapi.tech/api/planets/")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_data", resource: "planets", payload: data.results }))
            .catch(err => console.error(err));

        // 3. Fetch Vehicles
        fetch("https://www.swapi.tech/api/vehicles/")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_data", resource: "vehicles", payload: data.results }))
            .catch(err => console.error(err));
    }, []);

    // Helper function to render each horizontal row
    const renderRow = (title, data, type) => (
        <div className="my-5">
            <h2 className="text-danger text-start mb-4">{title}</h2>
            <div className="d-flex flex-row flex-nowrap overflow-auto pb-3"
                style={{ gap: "1rem" }}>
                {data && data.map((item) => (
                    <div key={item.uid} className="card bg-dark text-light
                     border-secondary" style={{ minWidth: "18rem" }}>

                        <div className="card-body">
                            <img
                                src={STAR_WARS_PLACEHOLDER}
                                className="card-img-top"
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = STAR_WARS_PLACEHOLDER;
                                }}
                            />
                            <h5 className="card-title">{item.name}</h5>
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate(`/details/${type}/${item.uid}`)}
                                >
                                    More Details
                                </button>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => dispatch({ type: "add_favorite", payload: { ...item, type } })}
                                >
                                    {/* Safety check for store.favorites using optional chaining */}
                                    {store.favorites?.some(fav => fav.uid === item.uid) ? "★" : "☆"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            {renderRow("Characters", store.people, "people")}
            {renderRow("Planets", store.planets, "planets")}
            {renderRow("Vehicles", store.vehicles, "vehicles")}
        </div>
    );
};