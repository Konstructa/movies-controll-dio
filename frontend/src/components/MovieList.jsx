import { useEffect, useState } from 'react';
import React from 'react'

const MovieList = () => {

    const [movies, setMovies] = useState([])
    
    useEffect(async () => {
        const url = "http://localhost:5000/movies";
        const res = await fetch(url);
        setMovies(await res.json());
    }, [])
    
    return(
            <table className="striped">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Description</th>
                </tr>
                </thead>

                <tbody>
                {movies.map(movie => {

                    return(
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.description}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
    )
}

export default MovieList;
