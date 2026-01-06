import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            {/* Logo */}
            <Link to="/" className="navbar-brand">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
                    alt="Star Wars"
                    style={{ height: "40px" }}
                />
            </Link>

            {/* Favorites Dropdown */}
            <div className="dropdown">
                <button
                    className="btn btn-warning dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    Favorites ⭐ {store.favorites.length}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-muted">
                            No favorites yet
                        </li>
                    ) : (
                        store.favorites.map((fav, index) => (
                            <li
                                key={index}
                                className="dropdown-item d-flex justify-content-between align-items-center"
                            >
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        navigate(`/details/${fav.type}/${fav.uid}`)
                                    }
                                >
                                    {fav.name}
                                </span>

                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                        dispatch({
                                            type: "remove_favorite",
                                            payload: fav.uid
                                        })
                                    }
                                >
                                    ✕
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
 