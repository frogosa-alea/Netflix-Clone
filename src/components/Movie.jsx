import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { MdGrade, MdPlayArrow, MdQueuePlayNext } from "react-icons/md";

const Movie = ({ item, id }) => {
  const [liked, setLiked] = useState(false);
  const { user } = UserAuth();
  const [saved, setSaved] = useState(false);

  const movieId = doc(db, "users", `${user?.email}`);

  const truncateString = (str, limit) => {
    if (str?.length > limit) {
      return str.slice(0, limit) + "...";
    } else return str;
  };

  const saveMovie = async () => {
    if (user?.email) {
      setLiked(!liked);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
      alert("Movie saved successfully.");
    } else {
      alert("Please login to save a movie.");
    }
  };
  return (
    // <>
    //   <div class="grid grid-cols-6 gap-2 px-16">
    //     {/* <!-- Item 1 --> */}
    //     <div class="flex flex-col gap-1">
    //       {/* <!-- Image --> */}
    //       <a href="" class="bg-purple-500">
    //         <img
    //           src="https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg"
    //           class="hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100"
    //         />
    //       </a>

    //       {/* <!-- Games Title -->/ */}
    //       <a href="#" class="hover:text-purple-500 text-gray-200 font-semibold">
    //         {" "}
    //         VALORANT{" "}
    //       </a>

    //       {/* <!-- Viewers --> */}
    //       <a href="#" class="hover:text-purple-500 text-sm text-gray-400 -mt-1">
    //         {" "}
    //         78.4K viewers{" "}
    //       </a>

    //       {/* <!-- Category Tags --> */}
    //       <div class="flex flex-row flex-wrap gap-2">
    //         <a
    //           href="#"
    //           class="hover:bg-gray-600 text-gray-300 text-xs font-semibold bg-gray-700 px-2 py-1 rounded-full"
    //         >
    //           {" "}
    //           Shooter{" "}
    //         </a>
    //         <a
    //           href="#"
    //           class="hover:bg-gray-600 text-gray-300 text-xs font-semibold bg-gray-700 px-2 py-1 rounded-full"
    //         >
    //           {" "}
    //           FPS{" "}
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div
      key={id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-4 hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100"
    >
      <img
        className="w-full h-auto block rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-pre-wrap p-4 text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveMovie}>
          {liked ? (
            <FaHeart className="absolute top-7 right-7 text-yellow-300" />
          ) : (
            <FaRegHeart className="absolute top-7 right-7 text-yellow-300" />
          )}
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <p className="text-white truncate">
          {item?.original_title || item?.title || item?.original_name}
        </p>
        <div class="flex flex-row flex-wrap gap-2 text-white text-sm">
          <div className="grid grow grid-flow-col auto-cols-max items-center gap-1 ">
            <MdGrade className="text-yellow-300" />
            {item?.vote_average}
          </div>
          <p>{item?.release_date?.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
