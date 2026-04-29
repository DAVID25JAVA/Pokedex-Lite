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
      <div className="flex items-center justify-center min-h-screen">
        Pokémon not found
      </div>
    );

  return (
    <Wrapper>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center mb-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 mb-6 p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <ArrowLeft />
            Back to List
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/*Image */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-square shadow bg-purple-50 rounded-2xl p-8 border border-white/20  ">
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

              <button
                onClick={() => handleFavorites(data?.name)}
                className=" absolute focus:outline-none top-2 right-2 flex cursor-pointer items-center justify-center w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 transition-colors group"
              >
                {isFav ? (
                  <Star size={20} className="text-red-500" />
                ) : (
                  <Heart
                    size={20}
                    className=" text-red-500 group-hover:text-red-500 transition-colors"
                  />
                )}
              </button>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold capitalize bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {data.name}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {data.types?.map((type, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium capitalize bg-linear-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.stats?.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                      {stat.stat.name.replace("-", " ").toUpperCase()}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.base_stat}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
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
                  <div
                    key={index}
                    className="px-6 py-3 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-200/50 backdrop-blur-sm text-blue-900 font-medium hover:from-blue-500/20 transition-all duration-300"
                  >
                    {ability.ability.name.replace("-", " ")}
                  </div>
                ))}
              </div>
            </div>

            {/* Base Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="text-center md:text-left">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Height
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.height / 10}m
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Weight
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.weight / 10}kg
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Base XP
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.base_experience}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Page;
