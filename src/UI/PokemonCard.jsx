import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PokemonCard({ pokemonData }) {
  const id = pokemonData?.url?.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className=" relative group flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(139,92,246,0.2)] hover:border-violet-400">
      <div className="w-36 h-36 cursor-pointer rounded-full bg-violet-50 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-100">
        <Link href={`/details/${id}`}>
          <Image
            alt={pokemonData?.name}
            src={imageUrl}
            width={96}
            height={96}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        <span className="absolute top-2 right-2 cursor-pointer">
          <Heart />
        </span>
      </div>

      <p className="text-sm font-bold capitalize text-gray-800">
        {pokemonData?.name}
      </p>
    </div>
  );
}

export default PokemonCard;
