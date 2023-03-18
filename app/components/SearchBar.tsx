"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocation(e.target.value);
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (!location) {
      return;
    }
    router.push(`/search?location=${location}`);
  };
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onKeyDown={handleInputEnter}
        onChange={handleInputChange}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={handleSearch}
      >
        Let's go
      </button>
    </div>
  );
}
