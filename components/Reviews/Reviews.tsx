"use client";

import { getCamperReviews } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./Reviews.module.css";
import { FaStar } from "react-icons/fa";
import Loader from "../Loader/Loader";
import ErrorState from "../ErrorState/ErrorState";

export default function Reviews() {
  const { camperId } = useParams<{ camperId: string }>();
  const totalStars = [1, 2, 3, 4, 5];

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => getCamperReviews(camperId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (error || !reviews) return <ErrorState />;

  return (
    <ul>
      {reviews.map((review) => (
        <li className={css.reviewItem} key={review.id}>
          <div className={css.header}>
            <div className={css.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className={css.reviewName}>{review.reviewer_name}</h3>
              <div className={css.starsContainer}>
                {totalStars.map((star, index) => (
                  <FaStar
                    key={index}
                    className={
                      star <= review.reviewer_rating
                        ? css.starFilled
                        : css.starEmpty
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={css.reviewComment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}