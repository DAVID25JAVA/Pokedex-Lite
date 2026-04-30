 Pokedex Lite Web App

A modern, responsive, and high-performance Pokédex Lite web application built using Next.js (JavaScript) and Tailwind CSS.
The app enables users to explore Pokémon, search by name, filter by type, manage favorites, and view detailed stats — all with a smooth and interactive UI.


Features
✅ Core Features
🔄 Data Fetching
Integrated with PokéAPI
Handles loading and error states efficiently
📋 Pokémon Listing
Responsive grid layout using Tailwind CSS
Displays Pokémon image and name
🔍 Search
Real-time search functionality
Instant filtering as the user types
🧪 Filter by Type
Filter Pokémon by types (Fire, Water, Grass, etc.)
Dynamic UI updates
📄 Pagination
Efficient server-side pagination
Optimized API calls
⭐ Favorites
Mark/unmark Pokémon as favorite
Persisted using localStorage
📊 Detail View
Modal or separate page showing:
Stats (HP, Attack, Defense, etc.)
Abilities and types
Smooth transitions and animations

Bonus Features
✨ Animations & Transitions
Hover effects on cards
Smooth modal open/close
Interactive UI feedback
⚡ Performance Optimization
Built with Next.js for fast rendering and scalability


🛠️ Tech Stack
Framework: Next.js (JavaScript)
Styling: Tailwind CSS
State Management: React Context API
Icons: lucide-react
Notifications: react-hot-toast
API: PokéAPI

State Management (Context API)

Used React Context API for managing global state across the application.

🔹 Why Context API?
Eliminates prop drilling
Centralized and scalable state management
Cleaner component structure
🔹 Managed States:
Pokémon data
Favorites list


Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/DAVID25JAVA/Pokedex-Lite
cd pokedex-lite

Install dependencies
npm install

Run development server
npm run dev