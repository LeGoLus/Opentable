import Link from "next/link";
import RestaurantCard from "./components/RestaurantCard";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";

export default function Search() {
  return (
    <>
      <Header />
      <div className="flex py-4 text-black m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          <RestaurantCard />
        </div>
      </div>
    </>
  );
}