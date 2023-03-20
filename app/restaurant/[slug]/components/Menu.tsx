import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function Menu({ itemList }: { itemList: Item[] }) {
  return (
    <main className="bg-white mt-5 text-black">
      <div className="mt-4 pb-1 mb-1">
        <h1 className="font-bold text-4xl">Menu</h1>
      </div>

      {!!itemList.length && (
        <>
          <div className="flex flex-wrap justify-between">
            {itemList.map((item) => {
              return <MenuCard item={item} key={item.id} />;
            })}
          </div>
        </>
      )}
      {!itemList.length && (
        <>
          <div className="flex flex-wrap justify-between">
            <h5>This restaurant does not have menu</h5>
          </div>
        </>
      )}
    </main>
  );
}
