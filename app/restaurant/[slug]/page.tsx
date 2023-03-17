import { PRICE, Prisma, PrismaClient } from "@prisma/client";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import ReviewCard from "./components/ReviewCard";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const prisma = new PrismaClient();

interface IRestaurant {
  id: number;
  name: string;
  description: string;
  images: string[];
  main_image: string;
  price: PRICE;
  slug: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<IRestaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      main_image: true,
      price: true,
      slug: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] text-black rounded p-3 shadow">
        <RestaurantNavbar slug={params.slug} />
        <Title title={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg text-black">
        <ReservationCard />
      </div>
    </>
  );
}
