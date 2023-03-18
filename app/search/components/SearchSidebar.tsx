"use client";

import { PRICE } from "@prisma/client";
import Link from "next/link";
import { ISearchParams } from "../page";

export default function SearchSidebar({
  locationList,
  cuisineList,
  searchParams,
}: {
  searchParams: ISearchParams;
  locationList: { name: string; id: number }[];
  cuisineList: { name: string; id: number }[];
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border text-center w-full text-reg font-light p-2 rounded-l",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "border text-center w-full text-reg font-light p-2",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border text-center w-full text-reg font-light p-2 rounded-r",
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locationList.length &&
          locationList.map((location) => {
            return (
              <Link
                href={{
                  pathname: "/search",
                  query: { ...searchParams, location: location.name },
                }}
                key={location.id}
                className="font-light text-reg capitalize block"
              >
                {location.name}
              </Link>
            );
          })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisineList.length &&
          cuisineList.map((cuisine) => {
            return (
              <Link
                href={{
                  pathname: "/search",
                  query: { ...searchParams, cuisine: cuisine.name },
                }}
                key={cuisine.id}
                className="font-light text-reg capitalize block"
              >
                {cuisine.name}
              </Link>
            );
          })}
      </div>
      <div className="mt-3 pb-4 mr-6">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => {
            return (
              <Link
                href={{
                  pathname: "/search",
                  query: { ...searchParams, price },
                }}
                className={className}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
