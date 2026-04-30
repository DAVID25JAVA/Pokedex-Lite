"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Wrapper from "@/UI/Wrapper";
import toast from "react-hot-toast";
import { usePokemon } from "@/Context/pokemonContext";
import API from "@/API/Api";
import Loader from "@/UI/Loader";
import Image from "next/image";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

function Page() {
  const { id } = useParams();
  const router = useRouter();
  const { loading, setLoading, handleFavorites, favorites } = usePokemon();
  const [data, setData] = useState(null);
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const isFav = favorites.some((i) => i?.name == data?.name);

  useEffect(() => {
    if (id) {
      fetchById();
    }
  }, [id]);

  const fetchById = async () => {
    setPokemonLoading(true);
    try {
      const res = await API({
        method: "GET",
        url: `/pokemon/${id}`,
      });
      // console.log("data--->", res);
      if (res) {
        setData(res);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Pokémon");
    } finally {
      setPokemonLoading(false);
      setLoading(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  if (loading || pokemonLoading) return <Loader />;

  if (!data)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen"
      >
        Pokémon not found
      </motion.div>
    );

  return (
    <Wrapper>
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goBack}
            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 mb-6 p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <ArrowLeft />
            Back to List
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start space-y-6"
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-square shadow bg-purple-50 rounded-2xl p-8 border border-white/20">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={
                    data.sprites?.other?.["official-artwork"]?.front_default ||
                    data.sprites?.front_default ||
                    "/placeholder-pokemon.png"
                  }
                  alt={`${data.name} sprite`}
                  width={300}
                  height={300}
                  className="w-full h-64 lg:h-80 object-contain mx-auto drop-shadow-2xl"
                  priority
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleFavorites(data?.name)}
                className="absolute focus:outline-none top-2 right-2 flex cursor-pointer items-center justify-center w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 transition-colors group"
              >
                {isFav ? (
                  <Star size={20} className="text-red-500" />
                ) : (
                  <Heart
                    size={20}
                    className="text-red-500 group-hover:text-red-500 transition-colors"
                  />
                )}
              </motion.button>
            </div>

            {/* Name + types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold capitalize  text-primary mb-2">
                {data.name}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {data.types?.map((type, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="px-4 py-2 rounded-full text-sm font-medium capitalize bg-linear-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                  >
                    {type.type.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.stats?.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.07 }}
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {stat.stat.name.replace("-", " ").toUpperCase()}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.base_stat}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + index * 0.07,
                          ease: "easeOut",
                        }}
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.abilities?.map((ability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50 backdrop-blur-sm text-blue-900 font-medium hover:from-blue-500/20 transition-all duration-300"
                  >
                    {ability.ability.name.replace("-", " ")}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Base Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200"
            >
              {[
                { label: "Height", value: `${data.height / 10}m` },
                { label: "Weight", value: `${data.weight / 10}kg` },
                { label: "Base XP", value: data.base_experience },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {item.label}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Page;
