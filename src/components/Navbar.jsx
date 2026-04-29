"use client";
import { usePokemon } from "@/Context/pokemonContext";
import Wrapper from "@/UI/Wrapper";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { pokeData, setPokeData, allPokeData } = usePokemon();

  useEffect(() => {
    if (!searchText.trim()) {
      setPokeData(allPokeData);
      return;
    }
    let timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSearch = () => {
    let searchResult = allPokeData.filter((i) =>
      i?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setPokeData(searchResult);
  };

  const clearInput = () => {
    setSearchText("")
  }

  return (
    <Wrapper>
      <div className="flex items-center justify-between border border-gray-200 rounded-full py-2 px-5">
        <Link href="/">
          <p className="text-primary font-bold text-xl md:text-2xl">Pokédex</p>
        </Link>

        <div className="relative hidden md:flex items-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name..."
            className="bg-gray-100 px-5 py-2 w-72 lg:w-96 rounded-full outline-none border border-primary focus:border-primary transition-colors text-sm"
          />
          {/* <span className="absolute right-1 flex items-center justify-center w-8 h-8 cursor-pointer bg-primary text-white rounded-full">
            <Search onClick={() => handleSearch(searchText)} size={16} />
          </span> */}

          {searchText.trim() && (
            <span onClick={clearInput} className="absolute right-1 flex items-center justify-center w-8 h-8 cursor-pointer bg-purple-500 text-white rounded-full">
              <X />
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Search — mobile only */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </button>

          {/* Favorites screens */}
          <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-50 transition-colors group">
            <Heart
              size={20}
              className="text-gray-400 group-hover:text-red-500 transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Search bar — mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative flex items-center px-1">
          <input
            type="text"
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-gray-100 px-5 py-2.5 rounded-full outline-none border border-purple-100 focus:border-primary transition-colors text-sm"
            autoFocus={searchOpen}
          />
          {/* <span className="absolute right-2 flex items-center justify-center w-8 h-8 cursor-pointer bg-primary text-white rounded-full">
            <Search size={16} />
          </span> */}

          {searchText.trim() && (
            <span onClick={clearInput} className="absolute right-2 flex items-center justify-center w-8 h-8 cursor-pointer bg-purple-500 text-white rounded-full">
              <X />
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
