import { usePokemon } from "@/Context/pokemonContext";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function PokemonCard({ pokemonData }) {
  const { handleFavorites, favorites } = usePokemon();
  const id = pokemonData?.url?.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const isFav = favorites?.some((i) => i?.name == pokemonData?.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(139,92,246,0.2)" }}
      className="relative group flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl p-4 transition-colors duration-300 hover:border-violet-400"
    >
      <div className="w-36 h-36 cursor-pointer rounded-full bg-violet-50 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-100">
        <Link href={`/details/${id}`}>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Image
              alt={pokemonData?.name}
              src={imageUrl}
              width={96}
              height={96}
              className="object-contain"
            />
          </motion.div>
        </Link>

        <motion.span
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleFavorites(pokemonData?.name)}
          className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 w-9 h-9 rounded-full cursor-pointer"
        >
          {isFav ? (
            <Star className="text-red-500 absolute top-1.5 left-1.5" />
          ) : (
            <Heart className="text-red-500 absolute top-1.5 left-1.5" />
          )}
        </motion.span>
      </div>

      <p className="text-sm font-bold capitalize text-gray-800">
        {pokemonData?.name}
      </p>
    </motion.div>
  );
}

export default PokemonCard;