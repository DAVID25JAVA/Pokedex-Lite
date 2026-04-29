import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-primary w-20 h-20 rounded-full border-4 border-t-transparent animate-spin"></div>
    </div>
  );
}

export default Loader;
