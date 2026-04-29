"use client";
import { createContext, useContext, useState } from "react";
// import API from "@/API/Api";
// import toast from "react-hot-toast";

const PokemoneContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [allPokeData, setAllPokeData] = useState([]);

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

  return (
    <PokemoneContext.Provider
      value={{ loading, setLoading, pokeData, setPokeData, setAllPokeData, allPokeData }}
    >
      {children}
    </PokemoneContext.Provider>
  );
};

export function usePokemon() {
  return useContext(PokemoneContext);
}
