"use client";
import { usePokemon } from "@/Context/pokemonContext";
import Wrapper from "@/UI/Wrapper";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { pokeData, setPokeData, allPokeData, favorites } = usePokemon();

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
    setSearchText("");
  };

  return (
    <Wrapper>
       
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between border border-gray-200 rounded-full py-2 px-5"
      >
        <Link href="/">
          <motion.p
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary font-bold text-xl md:text-2xl"
          >
            Pokédex
          </motion.p>
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

          <AnimatePresence>
            {searchText.trim() && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                onClick={clearInput}
                className="absolute right-1 flex items-center justify-center w-8 h-8 cursor-pointer bg-purple-500 text-white rounded-full"
              >
                <X />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </motion.button>

          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex cursor-pointer items-center justify-center w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 transition-colors group"
          >
            <Heart
              size={20}
              className="text-red-500 group-hover:text-red-500 transition-colors"
            />

            <AnimatePresence>
              {favorites?.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute top-0 right-0 text-[12px] w-5 h-5 text-center rounded-full text-white bg-primary"
                >
                  {favorites.length > 0 && favorites?.length}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Search bar — mobile */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden mt-2"
          >
            <div className="relative flex items-center px-1">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name..."
                className="w-full bg-gray-100 px-5 py-2.5 rounded-full outline-none border border-purple-100 focus:border-primary transition-colors text-sm"
                autoFocus={searchOpen}
              />
              {/* <span className="absolute right-2 flex items-center justify-center w-8 h-8 cursor-pointer bg-primary text-white rounded-full">
                <Search size={16} />
              </span> */}

              <AnimatePresence>
                {searchText.trim() && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    onClick={clearInput}
                    className="absolute right-2 flex items-center justify-center w-8 h-8 cursor-pointer bg-purple-500 text-white rounded-full"
                  >
                    <X />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Navbar;