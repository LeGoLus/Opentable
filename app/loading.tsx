import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[...Array(10)].map((key) => {
          return (
            <div
              key={key}
              className="animate-pulse bg-slate-200 m-3 w-64 h-72 rounded overflow-hidden border cursor-pointer"
            ></div>
          );
        })}
      </div>
      ;
    </main>
  );
}
