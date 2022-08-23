import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Request";
import { MdGrade, MdPlayArrow, MdQueuePlayNext } from "react-icons/md";
const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];
  console.log("movie", movie);

  useEffect(() => {
    axios.get(requests.requestTrending).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, limit) => {
    if (str?.length > limit) {
      return str.slice(0, limit) + "...";
    } else return str;
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] px-12 py-4 md:mx-12 md:my-4 ">
          <div className="grid grid-flow-col auto-cols-max gap-5 my-2 items-center text-sm">
            <div className="grid grid-flow-col auto-cols-max items-center gap-2">
              <MdGrade className="text-yellow-300" />
              {movie?.vote_average}
            </div>
            <div>
              <p className="uppercase">{movie?.media_type}</p>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">
            {movie?.original_title || movie?.title || movie?.original_name}
          </h1>
          <div className="my-4 flex gap-4">
            <button className="text-black bg-yellow-300 flex items-center uppercase rounded-full px-4 py-2 text-center shadow-md shadow-slate-500/50">
              <MdPlayArrow className="mr-2 h-5 w-5 " aria-hidden="true" />
              Play
            </button>
            <button className="text-black bg-sky-200 flex items-center uppercase rounded-full px-4 py-2 text-center shadow-md shadow-slate-500/50">
              <MdQueuePlayNext className="mr-2 h-5 w-5 " aria-hidden="true" />
              Watch Later
            </button>
            {/* <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button> */}
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
