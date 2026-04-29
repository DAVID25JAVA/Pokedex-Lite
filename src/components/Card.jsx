"use client";
import API from "@/API/Api";
import { usePokemon } from "@/Context/pokemonContext";
import Loader from "@/UI/Loader";
import PokemonCard from "@/UI/PokemonCard";
import Wrapper from "@/UI/Wrapper";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Card() {
  const {
    pokeData,
    setPokeData,
    setAllPokeData,
    loading,
    setLoading,
  } = usePokemon();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const res = await API({
        method: "GET",
        url: `/pokemon?limit=20&offset=0`,
      });
      if (res?.results) {
        setPokeData(res.results);
        setAllPokeData(res?.results);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!pokeData || pokeData.length === 0)
    return (
      <div className="sm:h-96 flex items-center mx-auto text-black font-medium text-xl text-center">
        Data not available
      </div>
    );

  return (
    <Wrapper>
      <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4 my-10">
        {pokeData.map((p) => (
          <PokemonCard pokemonData={p} key={p.url} />
        ))}
      </div>

      {/* Pagination */}
    </Wrapper>
  );
}

export default Card;
