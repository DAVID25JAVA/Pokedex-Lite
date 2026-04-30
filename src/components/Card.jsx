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
    allPokeData,
    loading,
    setLoading,
  } = usePokemon();

  const [page, setPage] = useState(0);
  const limit = 12;
  const [totalPages, setTotalPages] = useState(0);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [typeLoading, setTypeLoading] = useState(false);
  const [filteredAll, setFilteredAll] = useState([]);
  const [filterPage, setFilterPage] = useState(0);
  const [filterTotalPages, setFilterTotalPages] = useState(0);

  useEffect(() => {
    fetchPokemon(page);
  }, [page]);

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    if (selectedType && filteredAll.length > 0) {
      const start = filterPage * limit;
      const sliced = filteredAll.slice(start, start + limit);
      setPokeData(sliced);
    }
  }, [filterPage]);

  const fetchPokemon = async (currentPage) => {
    setLoading(true);
    try {
      const res = await API({
        method: "GET",
        url: `/pokemon?limit=${limit}&offset=${currentPage * limit}`,
      });
      const results = res?.results;
      if (results) {
        setPokeData(results);
        setAllPokeData(results);
        setTotalPages(Math.ceil(res.count / limit));
        setSelectedType("");
        setFilteredAll([]);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const res = await API({ method: "GET", url: `/type` });
      if (res?.results) setTypes(res.results);
    } catch {
      toast.error("Failed to load types");
    }
  };

  const handleTypeFilter = async (type) => {
    setSelectedType(type);
    setFilterPage(0);

    if (!type) {
      setPokeData(allPokeData);
      setFilteredAll([]);
      return;
    }

    setTypeLoading(true);
    try {
      const res = await API({ method: "GET", url: `/type/${type}` });
      if (res?.pokemon) {
        const all = res.pokemon.map((entry) => entry.pokemon);
        setFilteredAll(all);
        setFilterTotalPages(Math.ceil(all.length / limit));
        setPokeData(all.slice(0, limit));
      }
    } catch {
      toast.error("Failed to filter by type");
    } finally {
      setTypeLoading(false);
    }
  };

  const handlePrev = () => {
    if (selectedType) setFilterPage((p) => Math.max(p - 1, 0));
    else setPage((p) => Math.max(p - 1, 0));
  };

  const handleNext = () => {
    if (selectedType)
      setFilterPage((p) => Math.min(p + 1, filterTotalPages - 1));
    else setPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const currentPage = selectedType ? filterPage : page;
  const currentTotalPages = selectedType ? filterTotalPages : totalPages;
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === currentTotalPages - 1;

  if (loading) return <Loader />;

  if (!pokeData || pokeData.length === 0) {
    return (
      <div className="sm:h-96 flex items-center justify-center text-black font-medium text-xl">
        Data not available
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="flex justify-end mt-10 gap-3 items-center">
        <select
          value={selectedType}
          onChange={(e) => handleTypeFilter(e.target.value)}
          className="w-56 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary capitalize bg-white"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t.name} value={t.name} className="capitalize">
              {t.name}
            </option>
          ))}
        </select>

        {selectedType && (
          <button
            onClick={() => handleTypeFilter("")}
            className="px-3 py-2 rounded-md cursor-pointer bg-red-100 text-red-600 text-sm hover:bg-red-200 transition-all"
          >
            Clear Filter
          </button>
        )}
      </div>

      {typeLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4 my-10">
          {pokeData.map((p) => (
            <PokemonCard pokemonData={p} key={p.url} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 my-6">
        <button
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40 hover:bg-gray-300 transition-all"
        >
          Prev
        </button>

        <span>
          Page {currentPage + 1} / {currentTotalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="px-3 py-1 rounded bg-primary disabled:opacity-40 hover:bg-purple-700 text-white transition-all"
        >
          Next
        </button>
      </div>
    </Wrapper>
  );
}

export default Card;
