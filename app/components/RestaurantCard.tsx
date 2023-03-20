import Link from "next/link";
import { calculateReviewRatingAverage } from "../../utils/calculateReviewRatingAverage";
import { RestaurantCardType } from "../page";
import Price from "./Price";
import Stars from "./Stars";

interface Props {
  restaurant: RestaurantCardType;
}

export default function RestaurantCard({ restaurant }: Props) {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);
    if (rating == 0) return "Unrated";
    if (rating > 4) return "Awesome";
    if (rating > 3) return "Good";
    if (rating > 2) return "Average";
    return "Basic";
  };
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={restaurant.main_image}
          alt={`${restaurant.name} Main photo`}
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              <Stars reviews={restaurant.reviews} />
            </div>
            <p className="text-sm ml-2">{renderRatingText()}</p>
            <p className="ml-2 text-sm">
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? null : "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
