"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
// import API from "@/API/Api";
// import toast from "react-hot-toast";

const PokemoneContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [allPokeData, setAllPokeData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // const handleSearch = async (e) => {
  //   // console.log("Search--->", e);
  //   setLoading(true)
  //   try {
  //     const res = await API({
  //       method: "GET",
  //       url: `/pokemon/${e.toLowerCase()}`,
  //     });
  //     console.log("Search Data---->", res);
  //   } catch (error) {
  //     toast.error(error);
  //     setLoading(false)
  //   }
  // };

  useEffect(() => {
    const savedPokemon = localStorage.getItem("FavPokemon");
    if (savedPokemon) {
      const data = JSON.parse(savedPokemon);
      setFavorites(data);
    }
  }, []);

  const handleFavorites = (name) => {
    const isExist = favorites.find((i) => i?.name === name);
    if (isExist) {
      const updated = favorites.filter((i) => i?.name !== name);
      setFavorites(updated);
      localStorage.setItem("FavPokemon", JSON.stringify(updated));
      toast.success("Removed from favorites");
    } else {
      const favorite = allPokeData.find((i) => i?.name === name);
      const updated = [favorite, ...favorites];
      setFavorites(updated);
      localStorage.setItem("FavPokemon", JSON.stringify(updated));
      toast.success("Added to favorites");
    }
  };

  return (
    <PokemoneContext.Provider
      value={{
        loading,
        setLoading,
        pokeData,
        setPokeData,
        setAllPokeData,
        allPokeData,
        handleFavorites,
        favorites,
      }}
    >
      {children}
    </PokemoneContext.Provider>
  );
};

export function usePokemon() {
  return useContext(PokemoneContext);
}
