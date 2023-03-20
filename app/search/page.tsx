import RestaurantCard from "./components/RestaurantCard";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import { PRICE, PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: { name: string };
  location: { name: string };
  price: PRICE;
  slug: string;
  reviews: Review[];
}

interface IWhere {
  cuisine: {
    name: {
      equals: string;
    };
  };
  location: {
    name: {
      equals: string;
    };
  };
  price: {
    equals: PRICE;
  };
}

const fetchRestaurantsByParams = (
  searchParams: ISearchParams
): Promise<RestaurantCardType[]> => {
  const where: Partial<IWhere> = {};
  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
  }
  if (searchParams.location) {
    where.location = {
      name: {
        equals: searchParams.location.toLowerCase(),
      },
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    };
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: {
      select: {
        name: true,
      },
    },
    location: {
      select: {
        name: true,
      },
    },
    price: true,
    slug: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    select,
    where,
  });
};

const fetchLocations = () => {
  const locations = prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return locations;
};

const fetchCuisine = () => {
  const cuisine = prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return cuisine;
};

export interface ISearchParams {
  location?: string;
  cuisine?: string;
  price?: PRICE;
}

export default async function Search({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const restaurants = await fetchRestaurantsByParams(searchParams);
  const locations = await fetchLocations();
  const cuisine = await fetchCuisine();
  return (
    <>
      <Header />
      <div className="flex py-4 text-black m-auto w-2/3 justify-between items-start">
        <SearchSidebar
          locationList={locations}
          cuisineList={cuisine}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {!!restaurants.length &&
            restaurants.map((restaurant) => {
              return (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              );
            })}
          {!restaurants.length && (
            <p className="mt-6 h-24 w-full ml-4">
              Can't find anything, maybe check your spelling?
            </p>
          )}
        </div>
      </div>
    </>
  );
}
