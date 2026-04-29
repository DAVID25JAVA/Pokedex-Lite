import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PokemonProvider } from "@/Context/pokemonContext";

export const metadata = {
  title: "Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PokemonProvider>
          <Toaster />
          <Navbar />
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
