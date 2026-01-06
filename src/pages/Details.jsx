import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Details = () => {
    const { type, theId } = useParams(); 
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${theId}`)
            .then(res => res.json())
            .then(data => setItem(data.result.properties))
            .catch(err => console.error(err));
    }, [type, theId]);

    // This function generates a unique description based on the item's data
    const getLore = () => {
        if (!item) return "";

        if (type === "people") {
            return `${item.name} is a legendary figure in the Star Wars universe. Born in ${item.birth_year}, this individual stands ${item.height}cm tall and has left a lasting mark on galactic history through their unique path and characteristics.`;
        }
        
        if (type === "planets") {
            return `${item.name} is a planet characterized by its ${item.terrain} landscape and ${item.climate} climate. With a population of ${item.population}, it serves as a vital location within its orbital sector.`;
        }

        if (type === "vehicles" || type === "starships") {
            return `The ${item.name} is a ${item.model} crafted by ${item.manufacturer}. It is designed for high performance, capable of carrying ${item.passengers} passengers across the stars.`;
        }

        return "A mysterious entity from a galaxy far, far away, whose full history is tucked away in the ancient Jedi archives.";
    };

    if (!item) return <div className="container mt-5"><h1>Loading...</h1></div>;

    return (
        <div className="container mt-5">
            <div className="row d-flex align-items-center">
                <div className="col-md-6">

                </div>
                <div className="col-md-6 text-center text-light">
                    <h1 className="display-3">{item.name}</h1>
                    {/* The dynamic description is called here */}
                    <p className="fs-4">{getLore()}</p>
                </div>
            </div>
            
            <hr className="border-danger border-2 my-5" />

            <div className="row text-danger text-center fw-bold">
                <div className="col">Name<br/><span className="text-light">{item.name}</span></div>
                {type === "people" && (
                    <>
                        <div className="col">Birth Year<br/><span className="text-light">{item.birth_year}</span></div>
                        <div className="col">Gender<br/><span className="text-light">{item.gender}</span></div>
                        <div className="col">Height<br/><span className="text-light">{item.height}</span></div>
                    </>
                )}
                {type === "planets" && (
                    <>
                        <div className="col">Climate<br/><span className="text-light">{item.climate}</span></div>
                        <div className="col">Population<br/><span className="text-light">{item.population}</span></div>
                        <div className="col">Terrain<br/><span className="text-light">{item.terrain}</span></div>
                    </>
                )}
            </div>
        </div>
    );
};