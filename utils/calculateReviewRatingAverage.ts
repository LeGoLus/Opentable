import { Review } from "@prisma/client";
export const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) {
    return 0;
  }
  return (
    reviews.reduce((accumulator, review) => {
      return accumulator + review.rating;
    }, 0) / reviews.length
  );
};
