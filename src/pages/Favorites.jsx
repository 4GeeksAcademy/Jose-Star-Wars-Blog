import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h2 className="text-warning mb-4">Your Favorites ⭐</h2>

            {store.favorites.length === 0 ? (
                <p className="text-muted">You have no favorites yet.</p>
            ) : (
                <div className="row">
                    {store.favorites.map((item) => (
                        <div key={`${item.type}-${item.uid}`} className="col-md-4 mb-4">
                            <div className="card bg-dark text-light">


                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>

                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                navigate(`/details/${item.type}/${item.uid}`)
                                            }
                                        >
                                            View Details
                                        </button>

                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() =>
                                                dispatch({
                                                    type: "remove_favorite",
                                                    payload: item.uid
                                                })
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
