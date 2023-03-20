import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utils/calculateReviewRatingAverage";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import Reviews from "../restaurant/[slug]/components/Reviews";

export default function Stars({
  rating,
  reviews,
}: {
  reviews?: Review[];
  rating?: number;
}) {
  const renderStars = () => {
    if (!rating) {
      if (reviews) {
        rating = calculateReviewRatingAverage(reviews);
      } else {
        rating = 0;
      }
    }
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference > 0 && difference < 1) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference <= 0.6 && difference > 0.2) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star, index) => {
      return <Image key={index} src={star} alt="" className="w-4 h-4 mr-1" />;
    });
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
